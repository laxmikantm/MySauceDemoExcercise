import { Element } from '@wdio/sync';

export default class BasePage {
	protected getAllItems: any = (itemLocator: string) => {
		let list: Array<Element> = $$(itemLocator);
		return list;
	};
}
