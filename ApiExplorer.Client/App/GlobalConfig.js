(function () {
    'use strict';

    var oAuth = {
        Token: '',
        TokenJson: '',
        ExpiresIn: '',
        Clear: function () {
            this.Token = '';
            this.TokenJson = '';
            this.ExpiresIn = '';
        }
    };

    var GlobalConfig = {
        Name: 'ApiExplorerApp',
        Version: '1',
        OAuth: oAuth,
        ActiveEnvironment: 0,
        Environments: [
                {
                    Name: 'Local',
                    BaseUrl: '/',
                    ApiUrl: '/api/explorer',
                    AuthUrl: ''
                }
        ],
        ActiveContentType: 0,
        ContentTypes: [
            { Name: 'Json', HeaderValue: 'application/json' },
            { Name: 'Xml', HeaderValue: 'text/xml' }
        ]
    };

    if (localStorage.ActiveEnvironment !== undefined)
        GlobalConfig.ActiveEnvironment = localStorage.ActiveEnvironment;

    if (localStorage.ActiveContentType !== undefined)
        GlobalConfig.ActiveContentType = localStorage.ActiveContentType;

    angular.module('ApiExplorerApp')
      .value('GlobalConfig', GlobalConfig);


}());

