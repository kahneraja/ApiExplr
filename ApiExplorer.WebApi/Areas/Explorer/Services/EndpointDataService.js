(function () {
    'use strict'

    angular.module('ApiExplorerApp')
      .factory('EndpointDataService', ['$http', 'GlobalConfig', 'OAuthTokenService', 'ngProgress', '$location', EndpointDataService]);

    function EndpointDataService($http, GlobalConfig, OAuthTokenService, ngProgress) {

        var JsonFeed;

        var Settings = {};
        if (localStorage.EndpointDataServiceSettings !== undefined)
            Settings = JSON.parse(localStorage.EndpointDataServiceSettings);

        var Service = {
            Init: Init,
            GetEndpoints: GetEndpoints,
            GetEndpoint: GetEndpoint,
            LoadJsonFeed: LoadJsonFeed,
            GetData: GetData,
            JsonFeed: JsonFeed,
            SendRequest: SendRequest,
            Clear: Clear,
            Settings: Settings,
            UpdateSettings: UpdateSettings,
            IsActive: IsActive,
            FormatResponse: FormatResponse,
            IsConfigured: IsConfigured
        };

        return Service;

        function UpdateSettings(settings) {
            this.Settings = settings;
            localStorage.EndpointDataServiceSettings = JSON.stringify(this.Settings);
        }

        function Clear(){
            this.JsonFeed = undefined;
        }

        function IsConfigured() {
            if (this.Settings.FeedUri !== undefined && this.Settings.FeedUri !== '')
                return true;

            return false;
        }

        function IsActive() {
            if (this.JsonFeed !== undefined && this.JsonFeed !== '')
                return true;

            return false;
        }

        function Init() {
            if (!this.IsActive() && this.IsConfigured())
                return this.LoadJsonFeed().then();

            return false;
        }

        function GetEndpoints() {
            var endpoints = [];

            for (var i = 0; i < this.JsonFeed.length; i++) {
                var j = this.JsonFeed[i];
                var endpoint = new EndpointModel(j.Name, j.Uri, j.Info);
                endpoint.AddActions(j.Actions);
                endpoints.push(endpoint);
            }

            return endpoints;
        }

        function GetEndpoint(Name) {
            for (var i = 0; i < this.JsonFeed.length; i++) {
                var j = this.JsonFeed[i];
                var endpoint = new EndpointModel(j.Name, j.Uri, j.Info);
                if (endpoint.Name == Name) {
                    endpoint.AddActions(j.Actions);
                    return endpoint;
                }
            }
        }

        function LoadJsonFeed() {
            var that = this;
            var promise = this.GetData().then(function (d) {
                that.JsonFeed = d;
            });
            return promise;
        }

        function GetData() {
            var apiUrl = this.Settings.FeedUri;

            var promise = $http.get(apiUrl).then(function (response) {
                return response.data;
            });

            return promise;
        }


        function SendRequest(Url, Data, HttpMethod) {
            var contentType = GlobalConfig.ContentTypes[GlobalConfig.ActiveContentTypeIndex].HeaderValue;

            var authorization = OAuthTokenService.GetBearerToken();

            var that = this;

            ngProgress.start();

            var promise = $http({
                method: HttpMethod,
                url: Url,
                data: Data,
                headers: {
                    'Accept': contentType,
                    'Content-Type': contentType,
                    'Authorization': authorization
                }
            }).then(function (response) {
                ngProgress.complete();
                return that.FormatResponse(response);
            }, function (error) {
                ngProgress.complete();
                return that.FormatResponse(error);
            });

            return promise;
        }


        function FormatResponse(response) {
            var data = response;

            if (response.data !== undefined)
                data = response.data;

            if (GlobalConfig.ContentTypes[GlobalConfig.ActiveContentTypeIndex].Name == 'Json')
                data = JSON.stringify(data, null, 4);

            return data;
        }
    }
}());