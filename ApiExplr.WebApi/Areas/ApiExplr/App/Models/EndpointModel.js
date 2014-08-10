function EndpointModel(Name, Uri, Info) {
    this.Name = Name;
    this.Uri = Uri;
    this.Info = Info;
    this.Actions = [];

    this.AddActions = function (Json) {
        for (var i = 0; i < Json.length; i++) {
            var j = Json[i];
            var uniqueName = this.CreateUniqueActionName(j.Name);
            var action = new ActionModel(uniqueName, j.Uri, j.HttpMethod, j.Info);
            if (j.Parameters !== undefined && j.Parameters !== null && j.Parameters.length > 0)
                action.AddParameters(j.Parameters);
            this.Actions.push(action);
        }
    };

    this.CreateUniqueActionName = function (name) {
        var matchingCount = 0;
        for (var i = 0; i < this.Actions.length; i++) {
            if (this.Actions[i].Name === name)
                matchingCount++;
        }

        if (matchingCount > 0)
            return name + "-" + matchingCount;

        return name;
    };

    this.GetAction = function (Name, HttpMethod) {
        for (var i = 0; i < this.Actions.length; i++) {
            var action = this.Actions[i];
            if (action.Name == Name && action.HttpMethod == HttpMethod)
                return action;
        }
    };
}