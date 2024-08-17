import { createSearchParamsCache, parseAsBoolean, parseAsString } from "nuqs/server"

export const searchParams = {
	ip: parseAsString.withDefault(""),
	java: parseAsBoolean.withDefault(true),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
