import * as functions from "firebase-functions";
import * as request from "request";

/**
 * NumSignals reports the total number of signals indexed in the signal graph.
 * @param {Object} req GCF request context.
 * @param {Object} res GCF response context.
 */
export let NumSignals = functions.https.onRequest((req: functions.Request, res: functions.Response) => {
    const token: string = functions.config().floret.token;
    const url: string = functions.config().floret.url;
    const command: string = JSON.stringify({ token, command: "signal-totals" });
    const headers: object = { "Content-Type": "application/json; charset=utf-8" };
    const postConfig = {
        body: command,
        headers,
        url,
    };

    request.post(postConfig, (err, resp, content) => {
        let total: number = 0;
        if (!err && resp.statusCode === 200) {
            total = fetchCount(content);
        }
        const response: string = "There are currently " + total + " signals indexed. That's a lot!";
        // console.log("Sending response total to user: " + total)
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({ speech: response, displayText: response }));
    });
});

export let fetchCount = (content): number => {
    let total: number = 0;
    const body = JSON.parse(content);
    const counts = body.Objects;
    for (const i in counts) {
        if (counts.hasOwnProperty(i)) {
            const data = counts[i];
            total += data.count;
        }
    }

    return total;
};
