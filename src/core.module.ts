import { BackgroundBindingHandler } from "./ko/bindingHandlers/bindingHandlers.background";
import { WidgetBindingHandler } from "./ko/bindingHandlers/bindingHandlers.widget";
import { SecuredBindingHandler } from "./ko/bindingHandlers/bindingHandlers.secured";
import { DefaultRouter, DefaultRouteGuard } from "@paperbits/common/routing";
import { SettingsProvider } from "@paperbits/common/configuration";
import { IInjectorModule, IInjector } from "@paperbits/common/injection";
import { ModelBinderSelector, WidgetService } from "@paperbits/common/widgets";
import { PictureModule } from "./picture/ko/picture.module";
import { VideoPlayerModule } from "./video-player/ko/videoPlayer.module";
import { YoutubePlayerModule } from "./youtube-player/ko/youtubePlayer.module";
import { NavbarModule } from "./navbar/ko/navbar.module";
import { MapModule } from "./map/ko/map.module";
import { ButtonModule } from "./button/ko/button.module";
import { TestimonialsModule } from "./testimonials/ko/testimonials.module";
import { KoModule } from "./ko/ko.module";
import { ColumnModule } from "./column/ko/column.module";
import { SectionModule } from "./section/ko/section.module";
import { RowModule } from "./row/ko/row.module";
import { GoogleTagManager } from "./gtm/ko/gtm";
import { TextblockModule } from "./textblock/ko/textblock.module";
import { BackgroundModelBinder } from "@paperbits/common/widgets/background";
import { KnockoutRegistrationLoaders } from "./ko/knockout.loaders";
import { ViewModelBinderSelector } from "./ko/viewModelBinderSelector";
import { PermalinkResolver, PermalinkService } from "@paperbits/common/permalinks";
import { MediaPermalinkResolver } from "@paperbits/common/media/mediaPermalinkResolver";
import { XmlHttpRequestClient } from "@paperbits/common/http";
import { DefaultEventManager, GlobalEventHandler } from "@paperbits/common/events";
import { LocalCache } from "@paperbits/common/caching";
import { LayoutService } from "@paperbits/common/layouts/layoutService";
import { ContentItemService } from "@paperbits/common/contentItems/contentItemService";
import { PageService } from "@paperbits/common/pages";
import { BlogService } from "@paperbits/common/blogs";
import { MediaService } from "@paperbits/common/media";
import { BlockService } from "@paperbits/common/blocks";
import { NavigationService } from "@paperbits/common/navigation";
import { SiteService } from "@paperbits/common/sites";
import { UrlService } from "@paperbits/common/urls";
import { CardModule } from "./card/ko/card.module";
import { GridModule } from "./grid-layout-section/ko/grid.module";
import { GridCellModule } from "./grid-cell/ko/gridCell.module";
import { CollapsiblePanelModule } from "./collapsible-panel/ko";
import { MenuModule } from "./menu/ko";
import { ContentModule } from "./content/ko";


/**
 * Module registering core components.
 */
export class CoreModule implements IInjectorModule {
    public register(injector: IInjector): void {
        injector.bindCollection("autostart");
        injector.bindCollection("styleHandlers");
        injector.bindCollectionLazily("widgetHandlers");
        injector.bindCollectionLazily("routeGuards");
        injector.bindCollectionLazily("modelBinders");
        injector.bindCollectionLazily("viewModelBinders");
        
        /*** Core ***/
        injector.bindSingleton("settingsProvider", SettingsProvider);
        injector.bindSingleton("router", DefaultRouter);
        injector.bindSingleton("httpClient", XmlHttpRequestClient);
        injector.bindSingleton("eventManager", DefaultEventManager);
        injector.bindSingleton("globalEventHandler", GlobalEventHandler);
        injector.bindSingleton("localCache", LocalCache);

        /*** Services ***/
        injector.bindSingleton("contentItemService", ContentItemService);
        injector.bindSingleton("permalinkService", PermalinkService);
        injector.bindSingleton("widgetService", WidgetService);
        injector.bindSingleton("layoutService", LayoutService);
        injector.bindSingleton("pageService", PageService);
        injector.bindSingleton("blogService", BlogService);
        injector.bindSingleton("mediaService", MediaService);
        injector.bindSingleton("blockService", BlockService);
        injector.bindSingleton("navigationService", NavigationService);
        injector.bindSingleton("siteService", SiteService);
        injector.bindSingleton("urlService", UrlService);
        injector.bindSingleton("permalinkResolver", PermalinkResolver);
        injector.bindSingleton("mediaPermalinkResolver", MediaPermalinkResolver);

        injector.bind("modelBinderSelector", ModelBinderSelector);
        injector.bind("viewModelBinderSelector", ViewModelBinderSelector);
        injector.bind("gtm", GoogleTagManager);
        injector.bind("backgroundModelBinder", BackgroundModelBinder);

        injector.bindModule(new KnockoutRegistrationLoaders());
        injector.bindModule(new KoModule());
        injector.bindModule(new ContentModule());
        injector.bindModule(new ColumnModule());
        injector.bindModule(new RowModule());
        injector.bindModule(new TextblockModule());
        injector.bindModule(new SectionModule());
        injector.bindModule(new GridModule());
        injector.bindModule(new GridCellModule());
        injector.bindModule(new NavbarModule());
        injector.bindModule(new ButtonModule());
        // injector.bindModule(new MapModule());
        injector.bindModule(new MenuModule());
        injector.bindModule(new PictureModule());
        injector.bindModule(new VideoPlayerModule());
        injector.bindModule(new YoutubePlayerModule());
        injector.bindModule(new TestimonialsModule());
        injector.bindModule(new CardModule());
        injector.bindModule(new CollapsiblePanelModule());

        injector.bindToCollection("routeGuards", DefaultRouteGuard);
        injector.bindToCollection("autostart", WidgetBindingHandler);
        injector.bindToCollection("autostart", BackgroundBindingHandler);
        injector.bindToCollection("autostart", SecuredBindingHandler);
    }
}