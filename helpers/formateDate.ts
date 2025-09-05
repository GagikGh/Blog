export function formatDate(unixTimestamp: number) {
    return new Date(unixTimestamp * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}


