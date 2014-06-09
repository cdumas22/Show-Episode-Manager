define([
    "Show/Models/ShowCollection",
    "Episode/Models/EpisodeCollection"
], function (ShowCollection, EpisodeCollection) {
    return Backbone.Router.extend({
        routes: {
            "": "shows",
            "shows": "shows",
            "shows/new": "createShow",
            "shows/:id": "viewShow",

            "shows/:showid/episodes/new": "createEpisode",
            "shows/:showid/episodes": "episodes",
            "shows/:showid/episodes/:id": "viewEpisode"
        },
        initialize: function (options) {
            options || (options = {});
            var _this = this;

            if (options.el) {
                this.el = options.el;
            }

            this.showCollection = new ShowCollection();
            this.episodeCollection = new EpisodeCollection();
            
            //one show has many episodes one-to-many relationship
            //try using the plugin http://backbonerelational.org/
            this.showCollection.on("remove", function (show) {
                _this.episodeCollection.removeByShow(show)
            });

            this.showCollection.fetch();
            this.episodeCollection.fetch();
        },
        render: function (view) {
            if (this.currentView) {
                this.currentView.remove();
            }

            this.currentView = view;

            this.el.html(this.currentView.render().el);
        },

        createShow: function () {
            var _this = this;
            curl(["Show/Views/Item", "Show/Models/Show"], function (Show, Model) {
                _this.render(new Show({ model: new Model(), collection: _this.showCollection }));
            });
        },
        shows: function () {
            var _this = this;
            curl(["Show/Views/List"], function (Show) {
                _this.render(new Show({ collection: _this.showCollection }));
            });
        },
        viewShow: function (id) {
            var _this = this;
            curl(["Show/Views/Item"], function (Show) {
                _this.render(new Show({ model: _this.showCollection.get(id) }));
            });
        },

        createEpisode: function (showid) {
            var _this = this;
            curl(["Episode/Views/Item", "Episode/Models/Episode"], function (Episode, Model) {
                _this.render(new Episode({ model: new Model(), collection: _this.episodeCollection, show: _this.showCollection.get(showid) }));
            });
        },
        episodes: function (showid) {
            var _this = this;
            curl(["Episode/Views/List"], function (Episode) {
                _this.render(new Episode({ show: _this.showCollection.get(showid), collection: _this.episodeCollection }));
            });
        },
        viewEpisode: function (showid, id) {
            var _this = this;
            curl(["Episode/Views/Item"], function (Episode, Model) {
                _this.render(new Episode({ model: _this.episodeCollection.get(id), show: _this.showCollection.get(showid) }));
            });
        }
    });
});