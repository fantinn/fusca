# Fusca — Sol & Asfalto

Jogo 3D de corrida para navegador, com uma cidade litorânea aberta para explorar entre as provas. Abra `index.html` no Chrome, Edge ou Firefox com WebGL habilitado. O jogo e o Three.js estão no próprio arquivo e funcionam offline.

## Corridas

Clique em **ESCOLHER CORRIDA**. Durante a exploração, use **CORRER** para voltar ao box e escolher outra categoria. **VOLTAR AO BOX** fecha o menu para treino livre e exploração.

| Categoria | Pista | Comprimento | Voltas |
| --- | --- | --- | --- |
| Carro | Autódromo Costa do Sol | 3,45 km | 2 |
| Caminhão | Autódromo Costa do Sol | 3,45 km | 1 |
| Moto | Motocross Costa do Sol | 1,49 km | 2 |
| Kart | Autódromo Costa do Sol | 3,45 km | 2 |

O grid tem 8 participantes no computador e 6 no perfil leve. Os rivais fazem ultrapassagens, freiam para curvas e rampas e ajustam a dificuldade entre provas conforme o resultado. Não há bônus de velocidade por estarem atrás do jogador.

O circuito de asfalto tem pista de 17 m de largura, áreas de escape verdes, zebras, boxes, arquibancadas e placas de referência de frenagem. O motocross fica em uma área própria ao sul, com pista de 10,4 m de largura, cercas, paddock e saltos menores. Os anéis azuis permitem ir e voltar entre os dois complexos.

### Créditos e apostas

A sessão começa com R$ 300 em créditos fictícios. Escolha treino sem aposta ou R$ 25, 50, 100, 250 ou 500. Valores acima do saldo ficam indisponíveis e o saldo é validado novamente na largada.

- A aposta é descontada uma única vez ao entrar na prova.
- 1º lugar: retorno total de 3× a aposta; 2º: 1,5×; 3º: 1×.
- O retorno inclui a aposta inicial. Por exemplo: apostar 50 e vencer paga 150, dando lucro de 100.
- A prova gratuita paga 45 / 23 / 15 créditos no pódio.
- Abandonar ou sair do veículo perde a aposta. Reposicionar na pista não reembolsa nem cobra outra aposta.
- Créditos e progresso são locais à sessão e reiniciam ao recarregar a página.

### Física e controle

Os contatos transferem impulso e giro conforme a massa dos veículos. Rivais atingidos mantêm o deslocamento da colisão, ficam temporariamente sem assistência de trajetória e recuperam direção e aceleração gradualmente. O motor é limitado pelos parâmetros do próprio veículo; não há retomada instantânea após a batida.

A direção tem entrada progressiva e maior estabilização ao soltar o volante. Freio de mão e turbo continuam disponíveis. Carros de corrida e motos recebem números de identificação.

As rampas do motocross chegam a aproximadamente 2,55 m. Motos têm velocidade vertical limitada a 7 m/s, com alinhamento para a aterrissagem. Nas corridas, batidas não ativam o salto de empinada e os comandos não provocam mortais acidentais. Fora das provas, as manobras continuam disponíveis, com impulso menor.

## Controles

| Tecla | Ação |
| --- | --- |
| W/S ou setas | Acelerar / frear / ré |
| A/D ou setas | Direção |
| Shift | Turbo |
| Espaço | Freio de mão |
| R | Voltar à pista; levantar veículo capotado quando parado |
| C | Alternar câmera |
| E | Entrar / sair do veículo; abrir corridas nos anéis laranja |
| Esc | Pausar; fechar menu de corridas |
| 1–4 ou setas + Enter | Escolher categoria no menu |

No celular, jogue na horizontal. Botões de direção, pedais, turbo, freio de mão e ações aparecem na tela.

## Exploração e multiplayer

A cidade, trânsito, pedestres, serra, túneis, veículos clássicos, polícia e entregas continuam disponíveis. A pé: W/S anda, A/D vira, Shift corre, E interage, Q soca, X agarra, Espaço defende, F furta e G solta encomenda.

O surf, a prancha interativa, sua pontuação e as ondas surfáveis foram removidos. A praia e o mar permanecem no cenário com pequenas ondulações decorativas.

**JOGAR COM AMIGOS** cria ou entra em uma sala. A conexão usa Supabase Realtime e só é carregada quando alguém entra numa sala. Cada jogador vê os outros, mas as provas, apostas, trânsito e polícia são simulados localmente; não há colisão entre jogadores remotos. `?net=local` permite testar salas entre abas do mesmo navegador.

## Verificação

`tests/racing.cjs` usa Playwright e Edge. Instale Playwright ou defina `PLAYWRIGHT_MODULE` para a instalação disponível e execute `node tests/racing.cjs`.

A suíte verifica as quatro categorias, ausência de obstáculos no centro das pistas e nos grids, débito e pagamento das apostas, prevenção de pagamento duplicado, transferência de impulso, recuperação após colisão, limite vertical das motos, altura das rampas e menu no perfil móvel.

`?debug=1&manual=1` expõe os controles de diagnóstico sem iniciar o laço automático, permitindo passos determinísticos nos testes. `?touch=1` mostra controles móveis e `?low=1` aplica o perfil gráfico leve.

## Tecnologia e atribuição

JavaScript, WebGL e Three.js r170. Não há etapa de compilação. O Three.js é distribuído sob a licença MIT, reproduzida em `THIRD-PARTY-LICENSE.txt`.
