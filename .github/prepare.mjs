import { readFileSync, writeFileSync } from "fs";
const package_manifest = "./package.json";

const pkg = JSON.parse(readFileSync(
	package_manifest,
	"utf-8"
));
pkg.version = process.env.VERSION;

writeFileSync(
	package_manifest,
	JSON.stringify(pkg, null, "\t") + "\n"
);
