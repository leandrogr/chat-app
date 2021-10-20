export function isTokenExpired(token: string) {
    const payload = JSON.parse(
    Buffer.from(token.split('.')[1], "base64").toString("utf8")
    );

    //console.log(payload);
    const clockTimestamp = Math.floor(Date.now() /1000);
    return clockTimestamp > payload.exp;
}

export function getPayload(token: string) {
    return JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf8")
    );
}
  