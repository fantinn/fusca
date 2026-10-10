# Fusca — Sol & Asfalto

Jogo 3D de corrida para navegador, com uma cidade litorânea aberta para explorar entre as provas. Abra `index.html` no Chrome, Edge ou Firefox com WebGL habilitado. O jogo e o Three.js estão no próprio arquivo e funcionam offline.

## Corridas

Clique em **ESCOLHER CORRIDA**. Durante a exploração, use **CORRER** para voltar ao box e escolher outra categoria. **VOLTAR AO BOX** fecha o menu para treino livre e exploração.

Escolha a **PISTA** no menu e confira a prévia do traçado antes de clicar na categoria. “Padrão da categoria” mantém as combinações abaixo. Também há três circuitos independentes, disponíveis para carro, caminhão, kart e moto:

| Pista nova | Comprimento | Características |
| --- | --- | --- |
| Oval das Dunas | 1,52 km | Curvas amplas, retas rápidas e cenário de areia |
| Jardim dos Esses | 1,51 km | Sequência de esses, hairpin e vegetação |
| Porto Industrial | 1,47 km | Chicanes, frenagens fortes e contêineres |

O Motocross é exclusivo para motos. As outras pistas aceitam as quatro categorias. Os circuitos novos são construídos apenas quando usados e têm superfície, barreiras, grid, linha de chegada e minimapa próprios.

| Categoria | Pista | Comprimento | Voltas |
| --- | --- | --- | --- |
| Carro | Autódromo Costa do Sol | 3,45 km | 2 |
| Caminhão | Autódromo Costa do Sol | 3,45 km | 1 |
| Moto | Motocross Costa do Sol | 1,63 km | 2 |
| Kart | Autódromo Costa do Sol | 3,45 km | 2 |

O grid tem 8 participantes no computador e 6 no perfil leve. Os rivais fazem ultrapassagens, freiam para curvas e rampas e ajustam a dificuldade entre provas conforme o resultado. Não há bônus de velocidade por estarem atrás do jogador.

O circuito de asfalto tem pista de 17 m de largura, áreas de escape verdes, zebras, boxes, arquibancadas e placas de referência de frenagem. O motocross fica em uma área própria ao sul, com pista de 20 m de largura, retas longas com saltos, curvas abertas (raio mínimo de 50 m), uma curva com parede inclinada para andar no alto, cercas e paddock. Os anéis azuis permitem ir e voltar entre os dois complexos.

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

Nas corridas da categoria **Carro** em asfalto, a direção fica mais gradual em alta velocidade e o acelerador tem resposta progressiva. Para fazer drift, entre na curva acelerando e dê um toque no **Espaço**. Solte o freio de mão e mantenha **W + direção da curva** para sustentar o deslize. Contraesterce (vire para o lado oposto), alivie o acelerador ou freie com **S** para recuperar aderência. Segurar o freio de mão continua reduzindo velocidade; não é necessário mantê-lo pressionado para sustentar o drift.

O painel mostra **DRIFT**, o ângulo do deslize e **ALINHANDO** durante a recuperação. Fumaça, marcas de pneus e som acompanham o deslizamento real. No celular, o botão de freio de mão passa a se chamar **DRIFT** nessa categoria. A assistência exige velocidade e asfalto, cede após colisões e não concede bônus de velocidade nem pontos. Motos, karts, caminhões e exploração mantêm seus perfis de pilotagem.

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

**JOGAR COM AMIGOS** cria ou entra em uma sala. A conexão usa Supabase Realtime e só é carregada quando alguém entra numa sala. Qualquer participante pode escolher uma pista e uma categoria para iniciar a corrida da sala. Todos os participantes conectados são levados ao mesmo grid, inclusive quem estava a pé ou pausado. A sala aguarda a preparação de todos e inicia uma contagem de cinco segundos. Cada jogador ocupa uma posição exclusiva; cinco NPCs completam o grid, igual nos perfis leve e normal. Há suporte a até 16 jogadores por largada.

As corridas online são gratuitas, sem impor apostas aos outros participantes. Um coordenador escolhido automaticamente controla os NPCs e transmite seus estados; os outros navegadores interpolam esses estados. A classificação inclui os jogadores remotos. Trânsito e polícia continuam locais.

**Jogadores na mesma sala podem brigar:** Q dá soco (três seguidos derrubam; Espaço defende), segurar X agarra e arrasta, Q arremessa quem está seguro e quem é agarrado se solta apertando A e D alternadamente. Carros atropelam quem está a pé. Quem acerta detecta o golpe na própria tela e envia um evento; o jogo de quem apanha aplica o efeito. `node tests/pvp-online.cjs` testa isso com duas abas. O jogo não pausa a corrida online ao perder foco. Navegadores podem limitar a simulação de abas em segundo plano, portanto o coordenador deve manter o jogo aberto e ativo para melhor fluidez.

Quem entra depois da preparação participa da próxima corrida. Novas largadas ficam bloqueadas até todos terminarem ou abandonarem (limite de dez minutos). Se o coordenador ou outro participante perder a conexão, a corrida é encerrada e a sala pode iniciar outra. Pedidos repetidos e mensagens duplicadas não reiniciam a prova. `?net=local` permite testar salas entre abas do mesmo navegador.

## Verificação

`tests/racing.cjs` usa Playwright e Edge. Instale Playwright ou defina `PLAYWRIGHT_MODULE` para a instalação disponível e execute `node tests/racing.cjs`.

A suíte verifica as quatro categorias, ausência de obstáculos no centro das pistas e nos grids, débito e pagamento das apostas, prevenção de pagamento duplicado, transferência de impulso, recuperação após colisão, limite vertical das motos, altura das rampas e menu no perfil móvel.

`node tests/tracks-online.cjs` verifica os três circuitos novos com as quatro categorias e executa partidas entre abas via `BroadcastChannel`: pedido de largada por outro participante, jogador pausado/a pé, perfis gráficos diferentes, grid e contagem compartilhados, NPCs sincronizados, mensagens repetidas, entrada tardia, classificação, próxima corrida e desconexão do coordenador. Esses testes não dependem do serviço Supabase e não medem latência real entre dispositivos.

`node tests/handling.cjs --check` exercita a física de pilotagem em uma superfície plana isolada: entrada e sustentação do drift, contraesterço, alívio do acelerador, frenagem, baixa velocidade, turbo, colisão, reposicionamento, simetria esquerda/direita e consistência entre taxas de atualização. A suíte `racing.cjs` também verifica uma manobra com o carro real e o indicador de drift no navegador.

`?debug=1&manual=1` expõe os controles de diagnóstico sem iniciar o laço automático, permitindo passos determinísticos nos testes. `?touch=1` mostra controles móveis e `?low=1` aplica o perfil gráfico leve.

## Tecnologia e atribuição

JavaScript, WebGL e Three.js r170. Não há etapa de compilação. O Three.js é distribuído sob a licença MIT, reproduzida em `THIRD-PARTY-LICENSE.txt`.

## Otimizações de desempenho

- Colisões descartam veículos distantes antes dos cálculos de distância e contato, mantendo a resposta física e os passos de integração.
- Consultas de obstáculos estáticos reutilizam listas por região, com limite de 512 entradas e invalidação quando os obstáculos são adicionados ou removidos.
- A superfície plana do autódromo evita cálculos de serra, quebra-molas e consulta à linha da pista em cada roda.
- Veículos parados e estabilizados não recalculam a suspensão. Em trânsito distante, a suspensão visual atualiza em até 10 Hz, mantendo movimento, altura central e colisões ativos.
- Personagens distantes dispensam a animação detalhada. Hierarquias ocultas dispensam atualização das matrizes de renderização, sem impedir consultas de posição para a física.
- O shader do mar calcula apenas as ondulações decorativas; o código gráfico de ondas surfáveis foi removido.

Comparação local no Edge sem interface, perfil leve, 600 passos de simulação de 1/60 s após 120 passos de aquecimento:

| Cenário | Antes (média por passo) | Depois | Redução |
| --- | --- | --- | --- |
| Cidade | 1,51 ms | 1,21 ms | 20% |
| Corrida de carros | 1,81 ms | 1,44 ms | 20% |
| Motocross | 1,88 ms | 1,21 ms | 35% |

Esses números medem o tempo de CPU da simulação neste ambiente, não o FPS nem o desempenho de todos os aparelhos. O benchmark pode ser repetido com `node tests/performance.cjs [index.html] [relatorio.json]`.

`node tests/optimization.cjs` compara 700 cenários de contato com uma busca exaustiva, verifica invalidação e limite do cache, consultas espaciais com objetos ocultos e reposicionamento imediato de veículos. Os testes existentes de corrida continuam cobrindo as quatro categorias, apostas, impulsos, saltos e controles móveis.
