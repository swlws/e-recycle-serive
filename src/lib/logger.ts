import bunyan, { LogLevel } from "bunyan";

const mode = process.env.NODE_ENV || "development";

let level: LogLevel = "trace";
let streams: bunyan.Stream[] = [
  { level: "info", stream: process.stdout },
  { level: "trace", stream: process.stdout },
];

if (mode === "development") {
  streams.push({ level: "error", stream: process.stdout });
}

if (mode === "production") {
  level = "info";

  const filePath = `/var/tmp/error-${name}.log`;
  streams.push({ level: "error", path: filePath });
}

export default bunyan.createLogger({
  name: "E-RECYCLE-SERVER",
  level,
  streams,
});
