import {createReportDir, runSuite} from "./utils"

// Import benchmarks
import * as benchmarks from "./imports";

// Create file
const directory: string = createReportDir();
console.log(benchmarks)
// Run benchmarks
for (let bench in benchmarks) {
    console.log(bench)
    // runSuite(benchmarks[bench](directory));
}