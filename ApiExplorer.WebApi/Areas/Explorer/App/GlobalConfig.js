(function () {
    'use strict';

    var GlobalConfig = {
        Name: 'ApiExplorerApp',
        Version: '1',
        ActiveEnvironment: 0,
        Environments: [
                {
                    Name: 'Local',
                    BaseUrl: '/',
                    ApiUrl: '/api/explorer',
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

