(function () {
    'use strict'

    angular.module('ApiExplorerApp')
      .factory('OAuthTokenService', ['$http', 'GlobalConfig', 'Base64Service', 'ngProgress', OAuthTokenService]);

    function OAuthTokenService($http, GlobalConfig, Base64Service, ngProgress) {

        var Credentials = {};
        if (localStorage.OAuthTokenServiceCredentials !== undefined)
            Credentials = JSON.parse(localStorage.OAuthTokenServiceCredentials);

        var ActiveToken = {};

        var Service = {
            Credentials: Credentials,
            ActiveToken: ActiveToken,
            Init: Init,
            InitToken: InitToken,
            GetToken: GetToken,
            Clear: Clear,
            UpdateCredentials: UpdateCredentials,
            IsActive: IsActive,
            IsEnabled: IsEnabled,
            GetBearerToken: GetBearerToken
        };

        return Service;

        function UpdateCredentials(credentials) {
            this.Credentials = credentials;
            localStorage.OAuthTokenServiceCredentials = JSON.stringify(this.Credentials);
        }

        function Init() {

            if (!this.IsActive() && this.IsEnabled())
                this.InitToken();

            return true;
        }

        function IsActive() {
            if (this.ActiveToken.Data)
                return true;

            return false;
        }

        function IsEnabled() {
            if (this.Credentials.AuthUri)
                return true;

            return false;
        }

        function Clear(){
            this.Token = '';
            this.TokenJson = '';
            this.ExpiresIn = '';
        }

        function InitToken() {
            ngProgress.start();

            var that = this;

            this.GetToken().then(function (d) {
                ngProgress.complete();
                var accessToken = d.access_token;

                var shortToken = accessToken.substr(accessToken.indexOf('.') + 1, accessToken.lastIndexOf('.') - accessToken.indexOf('.') - 1);
                var tokenJson = Base64Service.Decode(shortToken);

                that.ActiveToken.Data = accessToken;
                that.ActiveToken.Json = tokenJson;
                that.ActiveToken.ExpiresIn = d.expires_in;
            });
        }

        function GetToken() {

            var params = 'Grant_Type=' + this.Credentials.GrantType + '&UserName=' + this.Credentials.UserName + '&Password=' + this.Credentials.Password + '&Scope=' + this.Credentials.Scope;
            var url = this.Credentials.AuthUri;
            var authorization = 'Basic ' + this.Credentials.DeveloperKey;
            var contentType = 'application/x-www-form-urlencoded';

            var promise = $http({
                method: 'POST',
                url: url,
                data: params,
                headers: {
                    'Content-Type': contentType,
                    'Authorization': authorization
                }
            }).then(function (response) {
                return response.data;
            }, function (error) {
            });

            return promise;
        }

        function GetBearerToken() {
            if (this.IsActive() && this.IsEnabled())
                return 'Bearer ' + this.ActiveToken.Data;

            return '';
        }

    }
}());