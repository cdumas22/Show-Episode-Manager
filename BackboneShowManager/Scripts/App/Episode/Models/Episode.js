define([], function () {
    return Backbone.Model.extend({
        localStorage: new Backbone.LocalStorage("Episode-Collection")
    });
});