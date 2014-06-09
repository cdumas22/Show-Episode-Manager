define([], function () {
    return Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage("Show-Collection")
    });
});