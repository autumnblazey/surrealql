import node_assert from "assert/strict";

/**
 * - enforces passed check is strictly a boolean (enforced through typescript)
 * - error message must be provided
 */
export function assert(val: boolean, msg: string) {
	node_assert(val, msg);
}
