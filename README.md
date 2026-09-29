# Fusca — Sol & Asfalto

Jogo 3D experimental de mundo aberto para navegador, ambientado em uma cidade litorânea.

## Jogar

Baixe `index.html` e abra no Chrome, Edge ou Firefox com WebGL habilitado. O arquivo contém o jogo e a biblioteca 3D, e funciona sem instalação ou conexão com a internet.

## Controles

| Tecla | Ação |
| --- | --- |
| W/S ou setas | Acelerar/frear no carro; andar para frente/trás a pé |
| A/D ou setas | Virar |
| Shift | Turbo no carro; correr a pé |
| Espaço | Freio de mão no carro; defender a pé |
| E | Entrar/sair do carro, conversar, pegar/entregar encomendas; iniciar surf junto à prancha e voltar à areia |
| Q | Socar |
| F | Furtar |
| G | Soltar encomenda |
| C | Alternar câmera |
| R | Desvirar o carro capotado após parar; normalmente reposicionar fora de perseguições |
| Esc | Pausar |

No celular, jogue com a tela deitada: o jogo entra em tela cheia ao começar e mostra botões de direção, pedais (acelerar, freio/ré, turbo e freio de mão) e ações. Com a tela em pé, ele pausa e pede para girar o aparelho.


## O que tem no jogo

- Fusca com física de derrapagem, assistência em curvas e freio de mão para drifts.
- Colisões com impulso: batidas empurram carros e sacodem a câmera.
- Batidas fortes derrubam postes, semáforos e coqueiros (a prefeitura conserta depois de uns minutos, longe de você). Derrubar conta como infração.
- Carroceria com suspensão (rola nas curvas, mergulha ao frear, agacha ao acelerar), rodas que travam no freio de mão e patinam no arranque.
- Marcas de pneu que ficam no asfalto e fumaça nas derrapagens fortes.
- Câmera que acompanha a derrapagem com leve atraso e abre o campo de visão com a velocidade e o turbo.
- Som opcional (botão SOM): motor com troca de marchas, pneus cantando e batidas.
- Corrida de rua com aposta: pare o Fusca no anel laranja à frente do ponto inicial e aperte E. Aposta até R$ 100 (a primeira corrida sem dinheiro vale R$ 40); passe pelos checkpoints antes do rival para levar o dobro.
- Água da praia transparente no raso, com fundo de areia visível e transição gradual para o azul profundo. Ondulações lentas e pequenas, cores suaves, espuma discreta e reflexos que diminuem à noite. Canal com ondulação suave e prancha acompanhando as ondas.
- Cidade aberta, praia acessível a pé, trânsito, pedestres e minimapa.
- Surf livre simples: siga a oeste pela avenida central até a areia e encontre a prancha azul (ponto azul no minimapa, x≈-300, z=0). E inicia; W/S regula a velocidade e A/D vira, também pelas setas ou botões do celular. E retorna à areia na altura atual; R reposiciona na avenida. Sem encomenda em mãos para entrar. Movimento com inércia, prancha flutuante e pose de surf; configuração e ciclo próprios para futuras melhorias.
- Serra do Sol ampliada ao norte: cinco montanhas acessíveis, estrada sinuosa, mirantes, terreno livre e altitude no painel. Siga ao norte pela avenida central (x=0), pela avenida x=216 ou pelo bairro leste (x=518).
- Circuito norte com estradas alternativas e dois túneis atravessando as montanhas, com pista dupla, teto em arco, iluminação, sinalização e marcação azul no minimapa. O piso dos túneis é separado do terreno acima e a câmera acompanha a passagem interna.
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
- Kombi, Opala SS, Mustang 67 e Cadillac 1959 com carrocerias chanfradas, caixas de roda recortadas, cabines e vidros inclinados, rodas próprias, frisos, retrovisores, limpadores, placas e grades detalhadas. Geometrias compartilhadas por modelo; a modelagem do Fusca permanece igual.
- Kombi T1 com frente convexa em duas cores, faixa clara em V, teto abaulado contínuo, cantos curvos, vidros de cantos arredondados e emblema frontal, inspirada em referências da corujinha real.
- Entregas pagas e interações com moradores.
- 52 moradores distribuídos por 14 regiões, com compras e entregas locais para evitar concentração no centro.
- Rotinas individuais com ritmos de caminhada variados, viradas suaves, pausas, alongamentos, celular, conversas e passeios pelos bairros.
- Ocorrências espontâneas com intervalos e limite de simultaneidade: moradores discutem e brigam entre si, com socos, desequilíbrio e quedas; outros tentam furtar carros parados ou lentos e fogem dirigindo.
- Alguns moradores provocam o jogador a pé. E encerra a provocação com uma conversa; Q usa o combate normal.
- Polícia persegue e detém os responsáveis pelas ocorrências entre NPCs, incluindo ladrões de carros, sem atribuir essas infrações ao jogador. Furtos interrompidos liberam o veículo; carros abandonados voltam ao trânsito.
- Personagens com rostos, cabelos, tons de pele, roupas, mãos e calçados mais detalhados, preservados durante as quedas.
- Combate com alcance, direção, defesa e equilíbrio: socos pelas costas derrubam para a frente, com reação do tronco, atraso dos pés e tentativa de apoio com as mãos. Golpes frontais causam recuo e exigem uma sequência para derrubar; golpes laterais desequilibram mais, especialmente durante a corrida.
- Quedas articuladas com distribuição de massa, limites para joelhos e cotovelos, atrito, impulso direcional e colisões com o chão e obstáculos. Após se estabilizar, o personagem se apoia, ajoelha e levanta. A simulação usa passos fixos para manter a resposta consistente em diferentes taxas de quadros.
- Caminhada e corrida com cadência ligada à velocidade, joelhos que dobram no passo, quadril e ombros em contrarrotação, transferência de peso e andar de costas. Socos com preparação, giro do tronco e retorno à guarda; quem apanha recua, a cabeça chicoteia, os joelhos cedem e os braços sobem para se proteger.
- Atropelamentos arremessam o corpo conforme a velocidade do carro: batidas frontais lançam mais alto e mais longe, com cambalhota e quique no chão; raspões de lado só empurram.
- Polícia com cinco níveis de procurado, perseguição, fuga e multas. Cada nova infração durante a perseguição mobiliza mais viaturas, mesmo com o medidor cheio; delitos graves chamam mais reforços. As viaturas chegam a cada 1,2 segundo, até 12 simultâneas, e o painel mostra quantas chegaram e quantas foram mobilizadas. Fuga ou detenção reinicia a mobilização.
- Agressões repetidas e atropelamentos fortes podem ser fatais e são denunciados como homicídio, com resposta policial maior. A vítima permanece caída por um minuto antes de reaparecer.
- Policiais também recebem socos e atropelamentos, com desequilíbrio, quedas articuladas e recuperação. Um policial caído ou atordoado não consegue prender o jogador.
- Viaturas com massa, impulso, giro e deslizamento nas colisões, usando o mesmo sistema de contato dos outros carros.
- Perseguição com motor e volante: os motoristas aceleram forte, corrigem tarde, derrapam, cortam por calçadas e áreas abertas e tentam dar ré quando ficam presos. A velocidade é moderada; a dificuldade para controlar o carro é intencional.

O progresso fica apenas na sessão atual e é reiniciado ao recarregar a página. Gráficos e física são estilizados; este é um protótipo de jogo.

## Tecnologia e atribuição

JavaScript, WebGL e Three.js r170. O Three.js é distribuído sob a licença MIT, reproduzida em `THIRD-PARTY-LICENSE.txt`.

O jogo completo está em `index.html`; não é necessário um processo de compilação.
