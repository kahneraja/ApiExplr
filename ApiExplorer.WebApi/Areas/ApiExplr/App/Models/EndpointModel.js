function EndpointModel(Name, Uri, Info) {
    this.Name = Name;
    this.Uri = Uri;
    this.Info = Info;
    this.Actions = [];

    this.AddActions = function (Json) {
        for (var i = 0; i < Json.length; i++) {
            var j = Json[i];
            var action = new ActionModel(j.Name, j.Uri, j.HttpMethod, j.Info);
            if (j.Parameters !== undefined && j.Parameters !== null && j.Parameters.length > 0)
                action.AddParameters(j.Parameters);
            this.Actions.push(action);
        }
    };

    this.GetAction = function (Name, HttpMethod) {
        for (var i = 0; i < this.Actions.length; i++) {
            var action = this.Actions[i];
            if (action.Name == Name && action.HttpMethod == HttpMethod)
                return action;
        }
    };
}