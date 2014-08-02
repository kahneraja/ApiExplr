using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Xml.Linq;


namespace ApiExplorer.Common
{
    public class ApiReflector
    {
        private Type BaseType { get; set; }
        private IEnumerable<XElement> xElements;

        public ApiReflector()
        {
        }

        public ApiReflector(Type baseType, string path)
        {
            BaseType = baseType;
            XDocument xdoc = XDocument.Load(path);
            xElements = xdoc.Descendants("members").Descendants("member");
        }

        public List<EndpointModel> CollectEndpoints()
        {
            var objects = LoadAssembly();

            var endpoints = new List<EndpointModel>();

            foreach (var t in objects)
            {
                var e = CreateEndpoint(t);
                endpoints.Add(e);
            }

            return endpoints;
        }

        public IEnumerable<Type> LoadAssembly()
        {
            var assembly = Assembly.GetAssembly(BaseType);
            var types = assembly.GetTypes();
            var objects = types.Where(x => x.BaseType == BaseType);
            return objects;
        }

        public EndpointModel CreateEndpoint(Type t)
        {
            var e = new EndpointModel();
            e.Name = t.Name.Replace("Controller", "");
            e.Info = GetEndpointInfo(t.FullName);

            

            if (t.GetCustomAttributes<RoutePrefixAttribute>().Count() > 0)
                e.Uri = t.GetCustomAttributes<RoutePrefixAttribute>().First().Prefix;

            e.Actions = CreateActions(t);
            return e;
        }

        public string GetEndpointInfo(string fullName)
        {
            var info = "";
            var xmlName = "T:" + fullName;
            var xElement = xElements.FirstOrDefault(x => x.Attribute("name").Value == xmlName);
            if (xElement != null)
                info = xElement.Descendants("summary").First().Value;
            return info.Trim();
        }

        public List<ActionModel> CreateActions(Type t)
        {
            var actions = new List<ActionModel>();

            var methods = t.GetMethods().Where(x => x.IsPublic && x.GetCustomAttributes<RouteAttribute>().Any()).ToList();

            foreach (var m in methods)
            {
                var action = CreateAction(m);
                actions.Add(action);
            }

            return actions;
        }

        public ActionModel CreateAction(MethodInfo methodInfo)
        {
            var action = new ActionModel();
            action.Name = methodInfo.Name;
            action.Parameters = CreateParameters(methodInfo.GetParameters().ToList());
            action.Info = GetActionInfo(methodInfo, action.Parameters);

            var info = FindActionInfo(methodInfo);

            if (methodInfo.GetCustomAttributes<RouteAttribute>().Any())
                action.Uri = methodInfo.GetCustomAttributes<RouteAttribute>().First().Template;

            action.HttpMethod = GetHttpActions(methodInfo);

            return action;
        }

        private string FindActionInfo(MethodInfo methodInfo)
        {
            var summary = "";
            return summary;
        }

        public string GetActionInfo(MethodInfo methodInfo, List<ParameterModel> parameters)
        {
            var info = "";
            var endpointName = methodInfo.DeclaringType.FullName;
            var actionName = methodInfo.Name;
            var xmlName = string.Format("M:{0}.{1}", endpointName, actionName);

            var xElement = FindMatchingAction(parameters, xmlName);

            if (xElement != null)
                info = xElement.Descendants("summary").First().Value;

            return info.Trim();
        }

        public XElement FindMatchingAction(List<ParameterModel> parameters, string xmlName)
        {
            var elements = xElements.Where(x => x.Attribute("name").Value.ToString().StartsWith(xmlName));

            if (elements.Count() == 0)
                return null;

            if (elements.Count() == 1)
                return elements.First();

            return PickActionFromParameters(parameters, elements);
        }

        private static XElement PickActionFromParameters(List<ParameterModel> parameters, IEnumerable<XElement> actions)
        {
            foreach (var a in actions)
            {

                var xParams = a.Descendants().Where(x => x.Name == "param");

                if (xParams.Count() == parameters.Count())
                {

                    var match = true;
                    var i = 0;

                    foreach (var parameter in parameters)
                    {
                        var xParamName = xParams.ElementAt(i).Attribute("name").Value;

                        if (xParamName != parameter.Name)
                        {
                            match = false;
                        }

                        i++;
                    }

                    if (match)
                        return a;
                }
            }

            return null;
        }

        public List<ParameterModel> CreateParameters(List<ParameterInfo> list)
        {
            var parameters = new List<ParameterModel>();
            foreach (var p in list)
            {
                var parameter = CreateParameter(p);

                parameters.Add(parameter);
            }

            return parameters;
        }

        public ParameterModel CreateParameter(ParameterInfo p)
        {
            var parameter = new ParameterModel();
            parameter.Name = p.Name;
            if (p.GetCustomAttributes<FromUriAttribute>().Any())
                parameter.FromUri = true;

            parameter.Type = p.ParameterType.Name;

            if (IsCollection(p.ParameterType))
            {
                parameter.Type = "Json.Collection";
                var property = CreateCollectionProperty(p.ParameterType);
                parameter.Properties.Add(property);
            }
            else if (p.ParameterType.IsClass && p.ParameterType != typeof(string))
            {
                parameter.Properties = CreateProperties(p.ParameterType);
            }

            return parameter;
        }

        private PropertyModel CreateCollectionProperty(Type type)
        {
            foreach (Type interfaceType in type.GetInterfaces())
            {
                if (interfaceType.IsGenericType
                    && interfaceType.GetGenericTypeDefinition() == typeof(IList<>))
                {
                    Type itemType = type.GetGenericArguments().First();
                    var property = CreateCollectionItem(itemType);
                    return property;

                }
            }

            return null;
        }

        public bool IsCollection(Type type)
        {
            foreach (Type interfaceType in type.GetInterfaces())
            {
                if (interfaceType.IsGenericType
                    && interfaceType.GetGenericTypeDefinition() == typeof(IList<>))
                {
                    return true;
                }
            }
            return false;
        }

        public List<PropertyModel> CreateProperties(Type type)
        {
            var properties = new List<PropertyModel>();
            foreach (var p in type.GetProperties())
            {
                var property = CreateProperty(p);

                properties.Add(property);
            }

            return properties;
        }



        public PropertyModel CreateProperty(PropertyInfo p)
        {
            var property = new PropertyModel();
            property.Name = p.Name;
            property.Type = p.PropertyType.Name;

            if (IsCollection(p.PropertyType))
            {
                property.Type = "Json.Collection";
                var collection = CreateCollectionProperty(p.PropertyType);
                property.Properties.Add(collection);
            }
            else if (p.PropertyType.IsClass && !IsString(p.PropertyType))
                property.Properties = CreateProperties(p.PropertyType);

            return property;
        }

        private PropertyModel CreateCollectionItem(Type t)
        {
            var properties = t.GetProperties();
            var property = new PropertyModel();
            property.Name = "Item";
            property.Type = t.Name;

            if (t.IsClass && !IsString(t))
                property.Properties = CreateProperties(t);

            return property;
        }

        private bool IsString(Type t)
        {
            if (t == typeof(string))
            {
                return true;
            }

            return false;
        }

        public string GetHttpActions(MethodInfo m)
        {
            var action = "";

            if (m.GetCustomAttributes<HttpGetAttribute>().Any())
                action = m.GetCustomAttribute<HttpGetAttribute>().HttpMethods.First().Method;

            if (m.GetCustomAttributes<HttpPostAttribute>().Any())
                action = m.GetCustomAttribute<HttpPostAttribute>().HttpMethods.First().Method;

            if (m.GetCustomAttributes<HttpPostAttribute>().Any())
                action = m.GetCustomAttribute<HttpPostAttribute>().HttpMethods.First().Method;

            if (m.GetCustomAttributes<HttpPutAttribute>().Any())
                action = m.GetCustomAttribute<HttpPutAttribute>().HttpMethods.First().Method;

            return action;
        }

        public static string GetTypeName(Type type)
        {
            if (type.IsGenericType &&
                    type.GetGenericTypeDefinition() == typeof(Nullable<>))
            {
                return type.GetGenericArguments()[0].Name;
            }

            return type.Name;
        }

    }

    public class EndpointModel
    {
        public string Info;
        public EndpointModel()
        {
            Actions = new List<ActionModel>();
        }

        public string Name { get; set; }
        public List<ActionModel> Actions { get; set; }
        public string Uri { get; set; }

        public string Comment { get; set; }
    }

    public class ActionModel
    {
        public ActionModel()
        {
            Parameters = new List<ParameterModel>();
        }

        public List<ParameterModel> Parameters { get; set; }
        public string Name { get; set; }
        public string HttpMethod { get; set; }
        public string Comment;
        public string Info;

        public string Uri { get; set; }
    }

    public class ParameterModel
    {
        public ParameterModel()
        {
            Properties = new List<PropertyModel>();
        }
        public string Name { get; set; }
        public string Type { get; set; }
        public bool FromUri { get; set; }
        public List<PropertyModel> Properties { get; set; }
    }

    public class PropertyModel
    {
        public PropertyModel()
        {
            Properties = new List<PropertyModel>();
        }
        public string Name { get; set; }
        public string Type { get; set; }
        public List<PropertyModel> Properties { get; set; }
    }
}


