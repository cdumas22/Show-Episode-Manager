using System.Web;
using System.Web.Optimization;

namespace BackboneShowManager
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/backbone").Include(
                        "~/Scripts/zepto.js",
                        "~/Scripts/curl.js",
                        "~/Scripts/handlebars.js",
                        "~/Scripts/lodash.js",
                        "~/Scripts/backbone.js",
                        "~/Scripts/backbone.localStorage.js",
                        "~/Scripts/backbone.relational.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
        }
    }
}