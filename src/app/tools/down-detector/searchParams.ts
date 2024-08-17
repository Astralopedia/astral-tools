import { createSearchParamsCache, parseAsString } from "nuqs/server"

export const searchParams = {
	ip: parseAsString.withDefault(""),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
