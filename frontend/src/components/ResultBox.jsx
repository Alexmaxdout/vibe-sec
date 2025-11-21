import { Box, Typography, Paper } from "@mui/material";

export default function ResultBox({ result, loading }) {
  if (loading) {
    return (
      <Paper sx={{ padding: 2, marginTop: 3, background: "#1e1e1e" }}>
        <Typography variant="h6" sx={{ color: "white" }}>
          Analysis loading...
        </Typography>
      </Paper>
    );
  }

  if (!result) return null;

  return (
    <Box sx={{ marginTop: 3 }}>
      {result.map((item, idx) => {
        const isUnsafe = item.status === "unsafe";

        return (
          <Paper
            key={idx}
            sx={{
              padding: 2,
              marginBottom: 2,
              background: "#1e1e1e",
              borderLeft: isUnsafe ? "5px solid #e74c3c" : "5px solid #2ecc71",
              color: "white"
            }}
          >
            {/* Header */}
            <Typography variant="h6" sx={{ mb: 1 }}>
              Chunk {idx + 1} — {isUnsafe ? "⚠️ Unsafe" : "✔️ Safe"}
            </Typography>

            {/* Code */}
            <Paper sx={{ padding: 1.5, background: "#000" }}>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "white" }}>
                {item.code}
              </pre>
            </Paper>

            {/* Explanation only if unsafe */}
            {isUnsafe && item.explanation && (
              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  background: "#2a0000",
                  borderRadius: 1
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Explanation:
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {item.explanation}
                </Typography>
              </Box>
            )}
          </Paper>
        );
      })}
    </Box>
  );
}
