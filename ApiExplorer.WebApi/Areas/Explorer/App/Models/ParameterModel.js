function ParameterModel(Name, Type, FromUri) {
    'use strict';

    this.Name = Name;
    this.Type = Type;
    this.FromUri = FromUri;
    this.Value
    this.DefaultValue;
    this.Properties = [];

    this.AddProperties = function (Json) {
        for (var i = 0; i < Json.length; i++) {
            var j = Json[i];
            var property = new PropertyModel(j.Name, j.Type, this.FromUri);
            if (j.Properties !== undefined && j.Properties !== null && j.Properties.length > 0)
                property.AddProperties(j.Properties);
            this.Properties.push(property);
        }
    };

    this.IsCollectionType = function ()
    {
        if (this.Type == 'Json.Collection')
            return true;

        return false;
    };

    this.HasProperties = function () {
        if (this.Properties.length > 0)
            return true;

        return false;
    };

    this.HasValue = function () {
        if (this.Value !== undefined && this.Value != '')
            return true;

        for (var i = 0; i < this.Properties.length; i++) {
            var p = this.Properties[i];
            if (p.HasValue())
                return true;
        }

        return false;
    };

    this.GetJsonData = function () {
        var jsonData = {};

        if (this.Value !== undefined && this.Value !== '')
            jsonData = this.Value;
        else
            jsonData = this.GetChildJsonData();

        return jsonData;
    };

    this.DuplicateLastProperty = function () {
        var lastIndex = this.Properties.length - 1;
        var template = this.Properties[lastIndex];
        var item = angular.copy(template);
        this.Properties.push(item);
    };

    this.GetCollectionData = function () {
        var jsonData = [];

        for (var i = 0; i < this.Properties.length; i++) {
            var p = this.Properties[i];
            if (p.HasValue()) {
                var d = p.GetJsonData();
                jsonData.push(d);
            }
        }

        return jsonData;
    };


    this.GetChildJsonData = function () {
        var jsonData = {};

        for (var i = 0; i < this.Properties.length; i++) {
            var p = this.Properties[i];

            if (p.HasValue() && p.IsCollectionType())
                jsonData[p.Name] = p.GetCollectionData();

            else if (p.HasValue() && p.FromUri == false)
                jsonData[p.Name] = p.GetJsonData();
        }

        return jsonData;
    };

    this.GetQuerystring = function (uriTemplate) {
        var querystring = '';

        if (this.FromUri && this.Value !== undefined)
            querystring += '&' + this.Name + '=' + this.Value;

        for (var i = 0; i < this.Properties.length; i++) {
            var property = this.Properties[i];
            querystring += property.GetQuerystring();
        }

        return querystring;
    };

    this.InUriTemplate = function (uriTemplate)
    {
        var template = '{' + this.Name + '}';
        if (uriTemplate.toLowerCase().indexOf(template.toLowerCase()) > -1)
            return true;

        return false;
    };
}