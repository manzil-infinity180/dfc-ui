/*
DockerfileLine represents a single line in a Dockerfile

    type DockerfileLine struct {
        Raw       string       `json:"raw"`
        Converted string       `json:"converted,omitempty"`
        Extra     string       `json:"extra,omitempty"` // Comments and whitespace that appear before this line
        Stage     int          `json:"stage,omitempty"`
        From      *FromDetails `json:"from,omitempty"`
        Run       *RunDetails  `json:"run,omitempty"`
        Arg       *ArgDetails  `json:"arg,omitempty"`
    }

*/

export default interface DockerfileLine {
    raw: string
    converted: string
    extra: string
    stage: number
}
