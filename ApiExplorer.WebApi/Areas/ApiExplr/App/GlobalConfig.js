(function () {
    'use strict';

    var GlobalConfig = {
        Name: 'ApiExplorerApp',
        Version: '1',
        ActiveContentTypeIndex: 0,
        ContentTypes: [
            { Name: 'Json', HeaderValue: 'application/json' },
            { Name: 'Xml', HeaderValue: 'text/xml' }
        ],
        SaveActiveContentTypeIndex: function (i) {
            this.ActiveContentTypeIndex = i;
            localStorage.GlobalConfigActiveContentTypeIndex = i;
        }
    };

    if (localStorage.GlobalConfigActiveContentTypeIndex)
        GlobalConfig.ActiveContentTypeIndex = localStorage.GlobalConfigActiveContentTypeIndex;

    angular.module('ApiExplorerApp')
      .value('GlobalConfig', GlobalConfig);


}());

