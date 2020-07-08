import DataEntry from "./DataEntry";

export default interface Plottable {
    plottables(): Map<string, DataEntry[]>         
}
