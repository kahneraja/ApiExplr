(function () {
    'use strict'

    angular.module('ApiExplorerApp')
      .factory('EndpointDataService', ['$http', 'GlobalConfig', 'Base64Service', 'ngProgress', EndpointDataService]);

    function EndpointDataService($http, GlobalConfig, Base64Service, ngProgress) {

        var JsonFeed;

        var Service = {
            Init: Init,
            GetEndpoints: GetEndpoints,
            GetEndpoint: GetEndpoint,
            LoadJsonFeed: LoadJsonFeed,
            GetData: GetData,
            JsonFeed: JsonFeed,
            SendRequest: SendRequest,
            Clear: Clear,
        };

        return Service;

        function Clear(){
            this.JsonFeed = undefined;
        }

        function Init() {
            if (this.JsonFeed === undefined)
                return this.LoadJsonFeed().then();

            return true;
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
            ngProgress.start();
            var that = this;
            var promise = this.GetData().then(function (d) {
                ngProgress.complete();
                that.JsonFeed = d;
            });
            return promise;
        }

        function GetData() {
            var apiUrl = GlobalConfig.Environments[GlobalConfig.ActiveEnvironment].ApiUrl;

            var promise = $http.get(apiUrl).then(function (response) {
                console.log(response);
                return response.data;
            });

            return promise;
        }

        function SendRequest(Url, Data, HttpMethod) {
            var contentType = GlobalConfig.ContentTypes[GlobalConfig.ActiveContentType].HeaderValue;
            var authorization = 'Bearer ' + GlobalConfig.OAuth.Token;

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
                console.log(response);
                return response.data;
            }, function (error) {
                ngProgress.complete();
                console.log(error);
                return error;
            });

            return promise;
        }
    }
}());