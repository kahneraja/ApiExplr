function ActionModel(Name, Uri, HttpMethod, Info) {
    this.Name = Name;
    this.Uri = Uri;
    this.Info = Info;
    this.DynamicUri = this.Uri;

    if (HttpMethod !== undefined)
        this.HttpMethod = HttpMethod;
    else
        this.HttpMethod = "GET";

    this.Parameters = [];

    this.AddParameters = function (Json) {
        for (var i = 0; i < Json.length; i++) {
            var j = Json[i];
            var parameter = new ParameterModel(j.Name, j.Type, j.FromUri);
            if (j.Properties !== undefined && j.Properties !== null && j.Properties.length > 0)
                parameter.AddProperties(j.Properties);
            this.Parameters.push(parameter);
        }
    };

    this.HasParameters = function () {
        if (this.Parameters.length > 0)
            return true;

        return false;
    };

    this.GetJson = function () {
        var jsonData = this.GetJsonData();
        var json = JSON.stringify(jsonData, null, 4);

        return json;
    };

    this.GetJsonData = function () {
        var jsonData = {};

        if (this.Parameters.length == 1 && this.Parameters[0].HasProperties())
            jsonData = this.GetChildJson();
        else
            jsonData = this.GetChildrenJson();

        return jsonData;
    };

    this.GetChildJson = function () {
        var jsonData = {};
        var p = this.Parameters[0];

        if (p.FromUri == false)
            jsonData = p.GetJsonData();

        return jsonData;
    };

    this.GetChildrenJson = function () {
        var jsonData = {};
        for (var i = 0; i < this.Parameters.length; i++) {
            var p = this.Parameters[i];

            if (p.HasValue() && p.IsCollectionType()){
                jsonData = p.GetCollectionData();
            }

            if (p.HasValue() && p.FromUri == false)
                jsonData[p.Name] = p.GetJsonData();

        }
        return jsonData;
    };

    this.RefreshDynamicUri = function () {
        var querystring = '?';

        this.DynamicUri = this.Uri;

        for (var i = 0; i < this.Parameters.length; i++) {
            var parameter = this.Parameters[i];

            this.SetUriTemplateParamater(parameter);

            if (!parameter.InUriTemplate(this.Uri))
                querystring += parameter.GetQuerystring();
        }

        if (querystring != '?')
            this.DynamicUri += querystring;
    };

    this.SetUriTemplateParamater = function (Parameter)
    {
        var name = '{' + Parameter.Name + '}';
        if (this.Uri.toLowerCase().indexOf(name.toLowerCase()) > -1 && Parameter.Value !== undefined && Parameter.Value != '')
            this.DynamicUri = this.DynamicUri.toLowerCase().replace(name.toLowerCase(), Parameter.Value);
    };
}