import { IWidgetBinding } from "@paperbits/common/editing";
import { ViewModelBinder } from "@paperbits/common/widgets";
import { YoutubePlayerViewModel } from "./youtubePlayerViewModel";
import { YoutubePlayerModel } from "../youtubePlayerModel";
import { EventManager } from "@paperbits/common/events";
import { Bag } from "@paperbits/common";

const defaultVideoId = "M7lc1UVf-VE";

export class YoutubePlayerViewModelBinder implements ViewModelBinder<YoutubePlayerModel, YoutubePlayerViewModel> {
    constructor(private readonly eventManager: EventManager) { }

    public async modelToViewModel(model: YoutubePlayerModel, viewModel?: YoutubePlayerViewModel, bindingContext?: Bag<any>): Promise<YoutubePlayerViewModel> {
        if (!viewModel) {
            viewModel = new YoutubePlayerViewModel();
        }

        const videoId = model.videoId ?? defaultVideoId;
        const autoplay = model.autoplay ? "1" : "0";
        const controls = model.controls ? "1" : "0";
        const loop = model.loop ? "1" : "0";
        const url = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay}&controls=${controls}&loop=${loop}`;

        viewModel.sourceUrl(url);

        const biding: IWidgetBinding<YoutubePlayerModel> = {
            name: "youtube-player",
            displayName: "Youtube player",
            readonly: bindingContext ? bindingContext.readonly : false,
            model: model,
            draggable: true,
            editor: "youtube-editor",
            applyChanges: async () => {
                await this.modelToViewModel(model, viewModel, bindingContext);
                this.eventManager.dispatchEvent("onContentUpdate");
            }
        };

        viewModel["widgetBinding"] = biding;

        return viewModel;
    }

    public canHandleModel(model: YoutubePlayerModel): boolean {
        return model instanceof YoutubePlayerModel;
    }
}