import { ContentModel } from "./contentModel";
import { Contract, Bag } from "@paperbits/common";
import { IModelBinder } from "@paperbits/common/editing";
import { WidgetModel, ModelBinderSelector } from "@paperbits/common/widgets";
import { PlaceholderModel } from "@paperbits/common/widgets/placeholder";


export class ContentModelBinder<TModel> implements IModelBinder<TModel> {
    constructor(protected readonly modelBinderSelector: ModelBinderSelector) { }

    public async getChildModels(nodes: Contract[], bindingContext: any): Promise<any[]> {
        const modelPromises = nodes.map((contract: Contract) => {
            const modelBinder = this.modelBinderSelector.getModelBinderByContract(contract);
            return modelBinder.contractToModel(contract, bindingContext);
        });

        return await Promise.all<any>(modelPromises);
    }

    public getChildContracts(models: WidgetModel[]): Contract[] {
        const nodes = [];

        models.forEach(model => {
            const modelBinder = this.modelBinderSelector.getModelBinderByModel(model);
            nodes.push(modelBinder.modelToContract(model));
        });

        return nodes;
    }

    public canHandleContract(contract: Contract): boolean {
        return contract.type === "page"; // TODO: Rename "page" > "content"
    }

    public canHandleModel(model: WidgetModel): boolean {
        return model instanceof ContentModel;
    }

    public async contractToModel(contentContract: Contract, bindingContext?: Bag<any>): Promise<TModel> {
        const contentModel = new ContentModel();

        if (bindingContext[contentContract.type]) {
            contentContract = bindingContext[contentContract.type];
        }

        if (contentContract.nodes) {
            contentModel.widgets = await this.getChildModels(contentContract.nodes, bindingContext);
        }
        else {
            contentModel.widgets = [<WidgetModel>new PlaceholderModel("No content")];
        }

        return <any>contentModel;
    }

    public modelToContract(model: TModel): Contract {
        const contract: Contract = {
            type: "page" // TODO: Rename "page" > "content"
        };

        return contract;
    }
}
