# Fusca — Sol & Asfalto

Jogo 3D experimental de mundo aberto para navegador, ambientado em uma cidade litorânea.

## Jogar

Baixe `index.html` e abra no Chrome, Edge ou Firefox com WebGL habilitado. O arquivo contém o jogo e a biblioteca 3D, e funciona sem instalação ou conexão com a internet.

## Controles

| Tecla | Ação |
| --- | --- |
| W/S ou setas | Acelerar/frear no carro; andar para frente/trás a pé |
| A/D ou setas | Virar |
| Shift | Turbo no carro; correr a pé; no surf, remada forte e agachar (tubo) |
| Espaço | Freio de mão no carro; defender a pé; no surf, furar a onda (remando) e pular (na onda) |
| E | Entrar/sair do carro (inclusive viaturas paradas ou lentas), conversar, pegar/entregar encomendas; iniciar surf junto à prancha, sair da onda e voltar à areia |
| Q | Socar; segurando alguém, arremessar |
| X (segurar) | Agarrar quem está à frente, em pé ou caído, e arrastar; soltar X larga |
| F | Furtar |
| G | Soltar encomenda |
| C | Alternar câmera |
| R | Desvirar o carro capotado após parar; normalmente reposicionar fora de perseguições; no surf, voltar ao pico |
| Esc | Pausar |

No celular, jogue com a tela deitada: o jogo entra em tela cheia ao começar e mostra botões de direção, pedais (acelerar, freio/ré, turbo e freio de mão) e ações. Com a tela em pé, ele pausa e pede para girar o aparelho.


## O que tem no jogo

- Fusca inspirado no 1200 clássico dos anos 60, com proporções próximas às medidas de época (4,07 m de comprimento, 1,54 m de largura e 1,50 m de altura): capô longo, carroceria contínua com normais suaves, teto arredondado, capô mais largo e volumoso, quebra-ventos, vidros curvos escurecidos no acabamento da Kombi, bancos claros e volante, para-lamas arredondados com caixas de roda abertas, estribos, para-choques cromados curvos, faróis inclinados com lentes e refletores, pneus estreitos com faixa branca larga, calotas abauladas, lanternas pequenas e saídas de escapamento duplas. Emblema VW cromado com fundo escuro no capô, calotas convexas e escala visual 20% maior no mundo do jogo, com rodas, colisões e acessórios de viatura proporcionais. Geometria compartilhada entre os carros e perfil com menos subdivisões no celular.
- Fusca com física de derrapagem, assistência em curvas e freio de mão para drifts.
- Colisões com impulso: batidas empurram carros e sacodem a câmera.
- Batidas fortes derrubam postes, semáforos e coqueiros (a prefeitura conserta depois de uns minutos, longe de você). Derrubar conta como infração.
- Carroceria com suspensão (rola nas curvas, mergulha ao frear, agacha ao acelerar), rodas que travam no freio de mão e patinam no arranque.
- Marcas de pneu que ficam no asfalto e fumaça nas derrapagens fortes.
- Câmera que acompanha a derrapagem com leve atraso e abre o campo de visão com a velocidade e o turbo.
- Som opcional (botão SOM): motor com troca de marchas, pneus cantando e batidas.
- Autódromo Costa do Sol ao sul da cidade: siga a avenida central (x=0) para o sul, passe pelo portão no muro e entre no box. Circuito travado de 2,45 km com cerca de 25 curvas: reta principal curta, dois grampos (um de 160° no fundo leste e outro de 150° logo abaixo da reta), chicane, sequências de esses no miolo e curvas de 90° em todos os cantos; zebras, caixas de brita, muretas e pneus com colisão, arquibancada, boxes, pórtico de largada com semáforo e iluminação para a noite. Na pista não há multa por batida.
- Corrida com aposta no autódromo: pare no anel laranja do box e aperte E para abrir o menu de modos (1–4, setas + Enter ou toque; Esc fecha):
  - **Carro**: Fuscas, 2 voltas. Você corre com o carro em que chegou (se for caminhão, moto ou kart, recebe um Fusca de corrida).
  - **Caminhão**: caminhões bicudos de carga, 1 volta. Mais lentos e pesados, freiam cedo e quase não derrapam.
  - **Moto**: motos esportivas com piloto, 2 voltas. Aceleram e freiam forte, inclinam nas curvas e não derrapam.
  - **Kart**: karts de corrida com piloto, 2 voltas. Chassi tubular baixo com bico, sidepods, para-choque traseiro, motor lateral com escapamento, pneus slick mais largos atrás e volante que gira com as rodas. Leves, com muita aderência e entre-eixos curto: fazem as curvas quase sem frear, mas a velocidade máxima é baixa (~125 km/h, ~160 com turbo). A câmera chega mais perto no kart e na moto.

  Quando o modo pede outro veículo, o seu fica estacionado no box e você recebe um veículo de corrida amarelo, que continua seu depois da corrida (dá para descer, subir de novo e sair com ele pela cidade). Aposta até R$ 100; 8 veículos no grid (6 no celular), e você larga no meio do pelotão. Pódio pago: 1º leva 3× a aposta, 2º leva 1,5× e 3º recupera a aposta (sem dinheiro, a corrida vale R$ 45 / 23 / 15). O painel mostra volta, posição (ex.: 3º de 8), distância para o carro da frente e tempo; R devolve o carro à pista. Se um rival vencer, a corrida continua até você cruzar a linha para definir sua posição.
- Rivais de verdade: sete Fuscas, caminhões, motos ou karts (conforme o modo) nas cores vermelho, azul, turquesa, verde, creme, laranja e roxo, cada um com física própria (empurram e são empurrados nas batidas) e ritmo próprio, os mais rápidos largando mais à frente. Seguem a linha ideal, freiam antes das curvas, derrapam de lado com contraesterço, fumaça e marcas de pneu, usam turbo nas retas e às vezes erram. Ultrapassam qualquer carro que esteja na linha deles, você ou outro rival, pelo lado com mais espaço e sem fechar quem já está ao lado. Depois da bandeirada, dão uma volta de desaceleração. A dificuldade se adapta: vencer deixa o próximo grid mais rápido, pódio um pouco mais rápido, e terminar fora do pódio um pouco mais lento.
- Água da praia transparente no raso, com fundo de areia visível e transição gradual para o azul profundo. Ondulações lentas e pequenas, cores suaves, espuma discreta e reflexos que diminuem à noite. Canal com ondulação suave e prancha acompanhando as ondas. As ondas têm face translúcida verde-esmeralda (o sol atravessa a face e o lábio), reflexo do céu nas beiradas, espuma rendada que corre para a praia e microondulação que faz o brilho do sol cintilar.
- Cidade aberta, praia acessível a pé, trânsito, pedestres e minimapa.
- Mar com ondas de verdade: séries de 3 a 7 ondas (de ~2,5 a 6,5 m) chegam de tempos em tempos, crescem ao se aproximar e quebram a cerca de 200 m da areia, descascando ao longo da crista como direita, esquerda, pico ou fechadeira. O lábio se projeta e forma tubo; atrás fica a espuma que corre até a praia. A altura da água é a mesma na física e na tela, e barcos, câmera e prancha acompanham a ondulação. No radar, as cristas aparecem em azul e a parte já quebrada em branco.
- Surf: siga a oeste pela avenida central até a areia e encontre a prancha azul (ponto azul no minimapa, x≈-300, z=0). E leva você ao pico, deitado na prancha; as ondas se formam perto de onde você está. Vire para a praia e reme (W, ou Shift para remar forte) quando a onda chegar: se estiver no ombro, a onda te pega e você fica de pé. Na parede, A/D curvam, W dá impulso, S freia, Shift agacha para entrar no tubo e Espaço pula (A/D giram no ar). A velocidade vem da inclinação da onda e passa de 60 km/h nas maiores. Fique à frente da espuma e fora do lábio para não cair. Espaço remando fura a onda por baixo. Cada onda vale pontos (distância, tempo de tubo, aéreos e batidas), convertidos em nota de 0 a 10 e em até R$ 100. E sai da onda ou volta à areia; R volta ao pico. Na onda, a câmera fica do lado da areia, olhando de frente para a parede com o surfista na frente dela.
- Serra do Sol ampliada ao norte: cinco montanhas acessíveis, estrada sinuosa, mirantes, terreno livre e altitude no painel. Siga ao norte pela avenida central (x=0), pela avenida x=216 ou pelo bairro leste (x=518).
- Circuito norte com estradas alternativas e dois túneis atravessando as montanhas, com pista dupla, teto em arco, iluminação, sinalização e marcação azul no minimapa. O piso dos túneis é separado do terreno acima e a câmera acompanha a passagem interna.
- Mão de direção brasileira: todo o trânsito (cidade e serra) circula pela faixa da direita, e o seu Fusca começa na faixa da direita da avenida.
- Trânsito na serra: 14 veículos (8 caminhões e alguns clássicos) sobem e descem as estradas da montanha e atravessam os túneis pela faixa da direita. Eles mudam de estrada nos entroncamentos, fazem retorno nas pontas sem saída, fazem as curvas com trajetória suave (freiam antes das curvas, esterçam as rodas da frente e inclinam a carroceria para fora), esperam quem está na frente nas curvas fechadas e podem ser furtados como os carros da cidade.
- Quebra-molas listrados em dez pontos da cidade, com elevação real e reação da suspensão.
- Saltos nos carros dirigidos pelo jogador: impulso vertical ao deixar rampas/cristas, gravidade, rotação no ar e aterrissagens com quique. Pneus sem contato não aceleram nem freiam o carro no ar.
- Entrar rápido ou desalinhado pode causar cambalhotas e capotamentos; contatos da carroceria dissipam energia até parar. R (ou o botão de reposicionar no celular) desvira o carro no próprio lugar.
- Rampa sinalizada na entrada norte da serra, seguindo a avenida central. A física usa passos de 1/120 s e funciona com Fusca, Kombi, Opala, Mustang e Cadillac.
- Carros acompanham a inclinação do terreno nas quatro rodas; subidas seguram a velocidade, descidas aceleram e a câmera evita entrar nas encostas.
- Ciclo de 12 minutos, com 10 minutos de dia e 2 de noite, começando às 10h: pôr do sol no mar, lua e estrelas, postes, janelas e faróis acesos à noite.
- Semáforos em todos os cruzamentos; o trânsito para no vermelho.
- Bairro novo a leste, do outro lado de um canal, ligado por uma ponte estaiada na avenida central, com roda-gigante no parque.
- Outdoors da Fantin pela cidade: nas praças do centro, na orla, na entrada da ponte e no topo dos prédios mais altos, iluminados à noite.
- Carros antigos na rua: Fusca, Kombi, Opala SS, Mustang 67 e Cadillac 1959. Chegue perto de qualquer um a pé (ele para) e aperte E para furtar; cada modelo tem aceleração, velocidade e peso próprios.
- Kombi, Opala SS, Mustang 67 e Cadillac 1959 com carrocerias chanfradas, caixas de roda recortadas, cabines e vidros inclinados, rodas próprias, frisos, retrovisores, limpadores, placas e grades detalhadas. Geometrias compartilhadas por modelo.
- Caminhões bicudos dos anos 70 no trânsito, com capô longo, para-lamas redondos, cabine quadrada e carroceria de madeira carregada de caixotes e sacos. Sete rodam pela cidade (cinco no centro, dois no bairro leste) no ritmo dos carros; dá para furtar e dirigir, pesados mas com bom fôlego.
- Batidas fortes capotam os carros do trânsito: uma pancada lateral (ou muito forte de frente) faz o veículo tombar, rolar e parar de lado ou de cabeça para baixo. Carros altos e estreitos como a Kombi capotam mais fácil; caminhões pesados quase nunca. O guincho desvira o carro depois de um tempo, longe de você.
- Kombi T1 com frente convexa em duas cores, faixa clara em V, teto abaulado contínuo, cantos curvos, vidros de cantos arredondados e emblema frontal, inspirada em referências da corujinha real.
- Entregas pagas e interações com moradores.
- 52 moradores distribuídos por 14 regiões, com compras e entregas locais para evitar concentração no centro.
- Rotinas individuais com ritmos de caminhada variados, viradas suaves, pausas, alongamentos, celular, conversas e passeios pelos bairros.
- Ocorrências espontâneas com intervalos e limite de simultaneidade: moradores discutem e brigam entre si, com socos, desequilíbrio e quedas; outros tentam furtar carros parados ou lentos e fogem dirigindo.
- Alguns moradores provocam o jogador a pé. E encerra a provocação com uma conversa; Q usa o combate normal.
- Polícia persegue e detém os responsáveis pelas ocorrências entre NPCs, incluindo ladrões de carros, sem atribuir essas infrações ao jogador. Furtos interrompidos liberam o veículo; carros abandonados voltam ao trânsito.
- Personagens com rostos, cabelos, tons de pele, roupas, mãos e calçados mais detalhados, preservados durante as quedas.
- Combate com alcance, direção, defesa e equilíbrio: socos pelas costas derrubam para a frente, com reação do tronco, atraso dos pés e tentativa de apoio com as mãos. Golpes frontais causam recuo e exigem uma sequência para derrubar; golpes laterais desequilibram mais, especialmente durante a corrida.
- Agarrão estilo Gang Beasts: segure X para pegar quem está à frente. Em pé, a pessoa é arrastada pela gola, se debate e acaba se soltando; correr ou dar trancos com ela a derruba. Caída, você segura o ponto do corpo mais perto das mãos (cabeça, braço, pé) e arrasta o corpo mole pela rua. Q arremessa (mais longe correndo); soltar X larga. Quem é atingido pelo corpo arremessado também cai (policiais inclusive), e um arremesso forte pode derrubar várias pessoas em sequência, como boliche. Arremessar e derrubar contam como agressão.
- Quedas articuladas com distribuição de massa, limites para joelhos e cotovelos, atrito, impulso direcional e colisões com o chão e obstáculos. Após se estabilizar, o personagem se apoia, ajoelha e levanta. A simulação usa passos fixos para manter a resposta consistente em diferentes taxas de quadros.
- Caminhada e corrida com cadência ligada à velocidade, joelhos que dobram no passo, quadril e ombros em contrarrotação, transferência de peso e andar de costas. Socos com preparação, giro do tronco e retorno à guarda; quem apanha recua, a cabeça chicoteia, os joelhos cedem e os braços sobem para se proteger.
- Atropelamentos arremessam o corpo conforme a velocidade do carro: batidas frontais lançam mais alto e mais longe, com cambalhota e quique no chão; raspões de lado só empurram.
- Polícia com cinco níveis de procurado, perseguição, fuga e multas. Cada nova infração durante a perseguição mobiliza mais viaturas, mesmo com o medidor cheio; delitos graves chamam mais reforços. As viaturas chegam a cada 1,2 segundo, até 12 simultâneas, e o painel mostra quantas chegaram e quantas foram mobilizadas. Fuga ou detenção reinicia a mobilização.
- Ser preso ou morrer mostra uma tela própria ("VOCÊ FOI PRESO." / "VOCÊ FOI MORTO.") com a multa ou a conta do hospital; CONTINUAR, Enter ou Esc voltam ao jogo.
- Depois de 1 minuto dirigindo sem nenhuma infração nem polícia atrás de você, aparece uma frase na tela para refletir. Qualquer infração, perseguição ou sair do carro zera a contagem.
- Agressões repetidas e atropelamentos fortes podem ser fatais e são denunciados como homicídio, com resposta policial maior. A vítima permanece caída por um minuto antes de reaparecer.
- Policiais também recebem socos e atropelamentos, com desequilíbrio, quedas articuladas e recuperação. Um policial caído ou atordoado não consegue prender o jogador.
- Viaturas podem ser roubadas: chegue perto de uma parada ou lenta e aperte E. O policial segue a pé, o giroflex pisca enquanto você dirige e o roubo gera procurado na hora. Até quatro viaturas roubadas ficam estacionadas pela cidade.
- Trânsito mais movimentado: cerca de 60 carros circulando no computador (44 no celular), espalhados para não nascerem sobrepostos.
- Viaturas caracterizadas (Opala, Fusca e Kombi): pintura branca com faixa lateral azul-marinho, filetes dourados e "POLÍCIA" nas duas laterais, giroflex em barra arredondada com lentes vermelha e azul que piscam com halo de luz, para-choque de impulsão e antena.
- Viaturas de patrulha circulam pela cidade junto com o trânsito, mesmo sem perseguição: giroflex apagado enquanto está tudo calmo, piscando quando você está sendo procurado. Roubar uma delas conta como roubo de viatura. Quando a polícia pede reforço, uma viatura de patrulha que esteja a até 90 m entra na perseguição antes de chegar uma nova; terminada a ocorrência, ela volta à ronda.
- Sirene (com SOM ligado, também a pé): as viaturas ligam a sirene ao entrar na perseguição, mais alta conforme a mais próxima chega perto. De longe ela faz o lamento lento; a menos de 30 m passa para o toque rápido.
- Viaturas com massa, impulso, giro e deslizamento nas colisões, usando o mesmo sistema de contato dos outros carros.
- Perseguição com motor e volante: os motoristas aceleram forte, corrigem tarde, derrapam, cortam por calçadas e áreas abertas e tentam dar ré quando ficam presos. A velocidade é moderada; a dificuldade para controlar o carro é intencional.

O progresso fica apenas na sessão atual e é reiniciado ao recarregar a página. Gráficos e física são estilizados; este é um protótipo de jogo.

As proporções do Fusca usam como referência a [ficha histórica do VW 1200](https://www.volkswagen-newsroom.com/en/vehicle-data-beetle-kaefer-12001200l-profile-19585), com detalhes visuais inspirados em exemplares anteriores à modernização de 1967. A modelagem é procedural e não pretende reproduzir todas as diferenças entre anos e mercados.

## Desempenho e resolução

- No celular, a resolução interna começa em até 1,3× a resolução CSS (antes 1,1×) e pode subir até 1,5× quando há desempenho disponível. Em aparelhos lentos, diminui automaticamente até 0,75×, respeitando a densidade da tela.
- No PC, a resolução se adapta até 1,7×. Aumentos exigem desempenho estável para reduzir oscilações na qualidade.
- As sombras atualizam em até 30 Hz no celular e 60 Hz no PC; os demais quadros reutilizam o mapa de sombras. Modelos detalhados distantes deixam de projetar sombras, com alcance menor no celular.
- Carros distantes usam versões simplificadas dos próprios modelos (células de 8 e 13 cm), e a troca só acontece quando o erro fica abaixo de 1 pixel na resolução e no campo de visão atuais. Nessa distância, rodas e calotas são desenhadas junto com a carroceria: 5 chamadas de desenho por carro em vez de 13.
- A serra é desenhada em blocos de 120 m com metade da resolução de malha quando o erro de altura fica abaixo de meio pixel; blocos com boca de túnel mantêm o detalhe total.
- Coqueiros, postes, semáforos, arbustos e cinturões de árvores desenham só as instâncias dentro da câmera ou da área de sombra do sol, em vez do mapa inteiro a cada quadro.
- Objetos opacos são desenhados da frente para trás, o que evita sombrear pixels escondidos atrás de prédios e carros.
- A linha de visão dos pedestres consulta só os obstáculos próximos (grade de colisão), em vez de todos os ~2.500 do mapa a cada quadro.
- Pausar interrompe a atualização do mundo e do painel. Abas ocultas suspendem a simulação e a renderização, limpam os controles e silenciam o áudio.
- Para verificar o layout de celular no computador, abra `index.html?touch=1`. `?low=1` aplica apenas o perfil gráfico leve.

## Tecnologia e atribuição

JavaScript, WebGL e Three.js r170. O Three.js é distribuído sob a licença MIT, reproduzida em `THIRD-PARTY-LICENSE.txt`.

O jogo completo está em `index.html`; não é necessário um processo de compilação.
