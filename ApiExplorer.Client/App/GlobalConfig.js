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
        ActiveEnvironment: 1,
        Environments: [
                {
                    Name: 'Sample',
                    BaseUrl: '/',
                    ApiUrl: './Services/Sample.json',
                    AuthUrl: ''
                },
                {
                    Name: 'Local',
                    BaseUrl: 'http://localhost:53243/',
                    ApiUrl: 'http://localhost:53243/api/explorer'
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

