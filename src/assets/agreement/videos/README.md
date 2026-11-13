# Vídeos do estudo de caso Agreement

Os fills de vídeo do Figma não podem ser exportados pelo Figma MCP; estes arquivos foram fornecidos
à parte e otimizados para a web (H.264, sem áudio, `faststart`). Os originais estão em
`design-assets/agreement/videos-source/`. Qualquer arquivo com estes nomes nesta pasta é usado
automaticamente (autoplay, loop, mudo, inline, sem controles):

| Arquivo          | Onde aparece                                              | Nó no Figma |
| ---------------- | --------------------------------------------------------- | ----------- |
| `hero.mp4`       | Fundo do hero ("Nuvidio-Novo-16x9-1"), 1920×1080           | 424:6662    |
| `hipotese.mp4`   | Seção 03 ("atendimento_ia_loop_5s"), 680×680 (exibido 340) | 424:6702    |
| `dashboard.mp4`  | Fundo da seção 07 ("cta 1"), 1920×546                      | 424:6812    |
| `momento-04.mp4` | Área de conteúdo da tela do iPhone no MOMENTO 04, 360×686  | 438:10183   |

Para trocar um vídeo, gere a versão web a partir do original, por exemplo:

```
ffmpeg -i original.mp4 -map 0:v:0 -an -write_tmcd 0 -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart hero.mp4
```
