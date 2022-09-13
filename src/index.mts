import { $fetch } from "ohmyfetch";

type Options = Partial<{
	/**
	 * This is the path that will be POSTed to. Include the full path to sql.
	 * For example, supply `http://localhost:8000/sql` or `https://surrealdb.example.com/sql`.
	 * This allows custom paths that don't end in `/sql` to be provided too
	 */
	url: string;
	auth: {
		username: string;
		password: string;
	};
	namespace: string;
	database: string;
}>;

export function create_surrealql(opts: Options = {}) {
	const headers: Record<string, string> = {};

	if (opts.auth) headers["Authorisation"] = Buffer.from(`${opts.auth.username}:${opts.auth.password}`).toString("base64");
	if (opts.namespace) headers["NS"] = opts.namespace;
	if (opts.database) headers["DB"] = opts.database;

	const fetch = $fetch.create({
		baseURL: opts.url ?? "http://localhost:8000/sql",
		method: "POST",
		headers,
		responseType: "json"
	});

	return async function<T = unknown>(query: string) {
		return await fetch<T>("", {
			body: query
		});
	};
}
