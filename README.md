# Vértice 3D

Modelador 3D que roda no navegador, com fluxo de trabalho de CAD: quatro vistas (Superior, Perspectiva, Frontal, Direita), linha de comando, camadas, snaps de objeto, gumball, desfazer e refazer.

**Abrir:** https://alefe7z.github.io/3dvect/

## O que faz

- **Curvas:** ponto, linha, polilinha, curva NURBS, curva interpolada, círculo, arco, elipse, retângulo, polígono, hélice, deslocar, arredondar e chanfrar cantos, unir, explodir
- **Superfícies:** extrudar, revolução, loft, varredura, tubo, superfície plana, superfície por 4 pontos, plano
- **Sólidos:** caixa, esfera, cilindro, cone, tronco de cone, toro, pirâmide, elipsoide; arredondar arestas (caixas, cilindros e extrusões); união, diferença e interseção booleanas
- **Transformações:** mover, copiar, girar, girar 3D, escalar (1D/2D/3D), espelhar, matriz retangular e polar
- **Análise:** distância, comprimento, área, volume (com peso estimado em ouro/prata), caixa delimitadora, informações
- **Impressão 3D:** verificação de peças (fechada, normais, espessura, peso em PLA/PETG/ABS/resina); exportação STL (binário ou texto, unidade, escala, um arquivo por objeto) e 3MF
- **Exibição:** aramado, sombreado, renderizado (materiais metálicos, vidro, cerâmica), fantasma, raio-X
- **Arquivos:** salvar/abrir (.json), importar e exportar OBJ, STL, 3MF, GLB/GLTF, PLY e **3DM (Rhino)**, captura de tela em PNG

## Uso rápido

Digite o nome de um comando (em português ou inglês: `Caixa` ou `Box`) e tecle Enter ou Espaço.
Coordenadas: `10,20,5` absoluta, `r10,0` relativa, `30<45` polar; um número sozinho define a distância.
Enter vazio repete o último comando, Esc cancela. Botão direito gira a perspectiva; roda dá zoom.

Arquivo único (`index.html`), sem instalação. Usa three.js, three-bvh-csg, fflate e rhino3dm via CDN.
