(function () {
    'use strict';

    angular.module('ApiExplorerApp')
      .factory('SampleJsonService', ['$http', SampleJsonService]);

    function SampleJsonService($http) {
        var Sample =
[
    {
        "Info": "Retrieve endpoint data.",
        "Name": "Explorer",
        "Actions": [
            {
                "Comment": null,
                "Info": "",
                "Parameters": [],
                "Name": "Get",
                "HttpMethod": "GET",
                "Uri": ""
            }
        ],
        "Uri": "api/explorer",
        "Comment": null
    },
    {
        "Info": "Manage customer data.",
        "Name": "Customers",
        "Actions": [
            {
                "Comment": null,
                "Info": "GET api/values/5",
                "Parameters": [],
                "Name": "Get",
                "HttpMethod": "GET",
                "Uri": ""
            },
            {
                "Comment": null,
                "Info": "GET api/values/5",
                "Parameters": [
                    {
                        "Name": "id",
                        "Type": "Int32",
                        "FromUri": true,
                        "Properties": []
                    }
                ],
                "Name": "Get",
                "HttpMethod": "GET",
                "Uri": "{id}"
            },
            {
                "Comment": null,
                "Info": "POST api/values",
                "Parameters": [
                    {
                        "Name": "customer",
                        "Type": "Customer",
                        "FromUri": false,
                        "Properties": [
                            {
                                "Name": "Orders",
                                "Type": "Json.Collection",
                                "Properties": [
                                    {
                                        "Name": "Item",
                                        "Type": "Order",
                                        "Properties": [
                                            {
                                                "Name": "Products",
                                                "Type": "Json.Collection",
                                                "Properties": [
                                                    {
                                                        "Name": "Item",
                                                        "Type": "Product",
                                                        "Properties": [
                                                            {
                                                                "Name": "Title",
                                                                "Type": "String",
                                                                "Properties": []
                                                            },
                                                            {
                                                                "Name": "Price",
                                                                "Type": "Decimal",
                                                                "Properties": []
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "Name": "TotalPrice",
                                                "Type": "Decimal",
                                                "Properties": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "Name": "Name",
                                "Type": "String",
                                "Properties": []
                            },
                            {
                                "Name": "Age",
                                "Type": "Int32",
                                "Properties": []
                            },
                            {
                                "Name": "Address",
                                "Type": "Address",
                                "Properties": [
                                    {
                                        "Name": "StreetNumber",
                                        "Type": "Int32",
                                        "Properties": []
                                    },
                                    {
                                        "Name": "StreetName",
                                        "Type": "String",
                                        "Properties": []
                                    },
                                    {
                                        "Name": "Suburb",
                                        "Type": "String",
                                        "Properties": []
                                    },
                                    {
                                        "Name": "Postcode",
                                        "Type": "Int32",
                                        "Properties": []
                                    },
                                    {
                                        "Name": "State",
                                        "Type": "String",
                                        "Properties": []
                                    },
                                    {
                                        "Name": "Country",
                                        "Type": "String",
                                        "Properties": []
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "Name": "Post",
                "HttpMethod": "POST",
                "Uri": ""
            }
        ],
        "Uri": "api/customers",
        "Comment": null
    },
    {
        "Info": "Retrieve amazing values from an amazing web api controller.",
        "Name": "Values",
        "Actions": [
            {
                "Comment": null,
                "Info": "GET api/values/5",
                "Parameters": [],
                "Name": "Get",
                "HttpMethod": "GET",
                "Uri": ""
            },
            {
                "Comment": null,
                "Info": "GET api/values/5",
                "Parameters": [
                    {
                        "Name": "id",
                        "Type": "Int32",
                        "FromUri": true,
                        "Properties": []
                    }
                ],
                "Name": "Get",
                "HttpMethod": "GET",
                "Uri": "{id}"
            },
            {
                "Comment": null,
                "Info": "POST api/values",
                "Parameters": [
                    {
                        "Name": "value",
                        "Type": "String",
                        "FromUri": false,
                        "Properties": []
                    }
                ],
                "Name": "Post",
                "HttpMethod": "POST",
                "Uri": ""
            },
            {
                "Comment": null,
                "Info": "PUT api/values/5",
                "Parameters": [
                    {
                        "Name": "id",
                        "Type": "Int32",
                        "FromUri": true,
                        "Properties": []
                    },
                    {
                        "Name": "value",
                        "Type": "String",
                        "FromUri": false,
                        "Properties": []
                    }
                ],
                "Name": "Put",
                "HttpMethod": "PUT",
                "Uri": "{id}"
            },
            {
                "Comment": null,
                "Info": "DELETE api/values/5",
                "Parameters": [
                    {
                        "Name": "id",
                        "Type": "Int32",
                        "FromUri": true,
                        "Properties": []
                    }
                ],
                "Name": "Delete",
                "HttpMethod": "",
                "Uri": "{id}"
            }
        ],
        "Uri": "api/values",
        "Comment": null
    }
];

        var Service = {
            Sample: Sample
        };

        return Service;
    }
}());