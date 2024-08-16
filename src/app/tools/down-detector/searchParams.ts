import { createSearchParamsCache, parseAsString } from "nuqs/server"

export const searchParams = {
	ip: parseAsString.withDefault("0.0.0.0:25565"),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
