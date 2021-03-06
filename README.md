# King Poison

Zlocesti kralj ima podrum s **n** bacvi vina. Spijun je uspio ubaciti otrov u jednu bacvu, ali kralj ne zna u koju. Otrov je 'vrlo djelotvoran' ali spor bez obzira na to koliko je otrov razrjeden, bilo koja kolicina  je dovoljna da ubije neku osobu i osoba umire nakon tocno 30 dana od konzumacije otrova. Kralj je spreman zrtvovati neki broj svojih robova kao kusace vina, ali zeli sto prije saznati koja je bacva otrovana. Na kraljevu zalost, broj robova je bitno manji od broja bacvi u podrumu.

- (a) Nadite postupak kojim kralj, nakon tocno 30 dana (tj. u najkrace moguce vrijeme), moze odrediti koja od n bacvi je otrovana, s tim da zrtvuje najvise O(logn) robova. Argumentirajte da taj postupak zaista pronalazi otrovanu bacvu u zadanom roku. uz zadano ogranicenje na broj robova.
  - Konkretno pitanje: Ako kralj ima 1000 bacvi vina, je li 10 robova dovoljno da odredi otrovanu bacvu nakon tocno 30 dana? Ako da, kako?
- (b) Moze li se problem rijesiti zrtvujuci manje robova, ali uz dulji rok? Primjerice, je li moguce iskoristiti samo jednog roba? Ako je, koliki je onda rok u kojem kralj nalazi otrovanu bacvu?
  - Konkretno pitanje: Ako kralj ima 1000 bacvi vina, a slavlje je planirano za 5 tjedana, je li 8 robova dovoljno da odredi otrovanu bacvu prije tog roka? Ako da. kako?

## Design

Take binary representation of the barrel index. On each 0 index, add the corresponding slave index to drink that barrel. Meaning that expected slave's death for that index represents that binary number of a barrel index. After each taste, based on the remaining dead and alive slaves in order, take the binary representation (0 - dead, 1 - alive) and that is your index of the poisoned barrel.
