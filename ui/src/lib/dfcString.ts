/*

func String(dlines []*dfc.DockerfileLine) string {
	var builder strings.Builder

	for i, line := range dlines {
		// Add the Extra content (comments, whitespace)
		if line.Extra != "" {
			builder.WriteString(line.Extra)
		}

		// If the line has been converted, use the converted content
		if line.Converted != "" {
			builder.WriteString(line.Converted)
			builder.WriteString("\n")
		} else if line.Raw != "" {
			// If this is a normal content line
			builder.WriteString(line.Raw)

			// If this is the last line, don't add a newline
			if i < len(dlines)-1 {
				builder.WriteString("\n")
			}
		}
	}

	return builder.String()
}

*/

import DockerfileLine from "@/types/DockerfileLine";

export default function DockerfileLineToString(dlines: Array<DockerfileLine>): string {
	let result = '';
	dlines.forEach((line, i) => {
		if (line.extra) {
			result += line.extra;
		}
		if (line.converted) {
			result += line.converted + '\n';
		} else if (line.raw) {
			result += line.raw;
			if (i < dlines.length - 1) {
				result += '\n';
			}
		}
	});
	return result;
}
