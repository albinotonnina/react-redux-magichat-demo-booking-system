export const delayedPromise = (value, delayInMS = 200) =>
    new Promise((resolve, _) => {
        setTimeout(
            () => resolve(value),
            delayInMS
        )
    });

export const failedPromise = (statusCode, status, reason, delayInMS = 200) =>
    new Promise((_, reject) => {
        setTimeout(
            () => reject({statusCode, status, reason}),
            delayInMS
        )
    });
