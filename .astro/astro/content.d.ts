declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"comment-obtenir-avis-google-restaurant.md": {
	id: "comment-obtenir-avis-google-restaurant.md";
  slug: "comment-obtenir-avis-google-restaurant";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"fidelisation-client-chiffres-cles.md": {
	id: "fidelisation-client-chiffres-cles.md";
  slug: "fidelisation-client-chiffres-cles";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"fidelisation-sans-carte.md": {
	id: "fidelisation-sans-carte.md";
  slug: "fidelisation-sans-carte";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"gamification-fidelite-client-restaurant.md": {
	id: "gamification-fidelite-client-restaurant.md";
  slug: "gamification-fidelite-client-restaurant";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"gerer-avis-negatifs-fidelisation.md": {
	id: "gerer-avis-negatifs-fidelisation.md";
  slug: "gerer-avis-negatifs-fidelisation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"programme-fidelite-restaurant-2026.md": {
	id: "programme-fidelite-restaurant-2026.md";
  slug: "programme-fidelite-restaurant-2026";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"sms-marketing-restaurant-fidelisation.md": {
	id: "sms-marketing-restaurant-fidelisation.md";
  slug: "sms-marketing-restaurant-fidelisation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"strategie-fidelisation-2026.md": {
	id: "strategie-fidelisation-2026.md";
  slug: "strategie-fidelisation-2026";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"strategie-seo-local-restaurant.md": {
	id: "strategie-seo-local-restaurant.md";
  slug: "strategie-seo-local-restaurant";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tendances-fidelisation-2026.md": {
	id: "tendances-fidelisation-2026.md";
  slug: "tendances-fidelisation-2026";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"blog_en": {
"5-loyalty-strategies-2026.md": {
	id: "5-loyalty-strategies-2026.md";
  slug: "5-loyalty-strategies-2026";
  body: string;
  collection: "blog_en";
  data: InferEntrySchema<"blog_en">
} & { render(): Render[".md"] };
"customer-loyalty-key-numbers.md": {
	id: "customer-loyalty-key-numbers.md";
  slug: "customer-loyalty-key-numbers";
  body: string;
  collection: "blog_en";
  data: InferEntrySchema<"blog_en">
} & { render(): Render[".md"] };
"how-to-get-more-google-reviews-restaurant.md": {
	id: "how-to-get-more-google-reviews-restaurant.md";
  slug: "how-to-get-more-google-reviews-restaurant";
  body: string;
  collection: "blog_en";
  data: InferEntrySchema<"blog_en">
} & { render(): Render[".md"] };
"local-seo-restaurant-2026.md": {
	id: "local-seo-restaurant-2026.md";
  slug: "local-seo-restaurant-2026";
  body: string;
  collection: "blog_en";
  data: InferEntrySchema<"blog_en">
} & { render(): Render[".md"] };
"loyalty-program-restaurant-2026.md": {
	id: "loyalty-program-restaurant-2026.md";
  slug: "loyalty-program-restaurant-2026";
  body: string;
  collection: "blog_en";
  data: InferEntrySchema<"blog_en">
} & { render(): Render[".md"] };
"loyalty-without-punch-card-2026.md": {
	id: "loyalty-without-punch-card-2026.md";
  slug: "loyalty-without-punch-card-2026";
  body: string;
  collection: "blog_en";
  data: InferEntrySchema<"blog_en">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
