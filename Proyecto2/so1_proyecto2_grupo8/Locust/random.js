//Modificar numero de registros
const registros = 200; //# registros generados
const edadMinima = 0; //años
const edadMaxima = 75; //años

//Data origen:
const nombres = ['Aaron', 'Abdul', 'Abel', 'Abelardo', 'Abraham', 'Adam', 'Adan', 'Adolfo', 'Adrian', 'Adriano', 'Agustin', 'Aladino', 'Alan', 'Alberto', 'Alejandro', 'Alessandro', 'Alexis', 'Alfonso', 'Alonso', 'Alvaro', 'Andres', 'Angel', 'Antonio', 'Ariel', 'Armando', 'Arturo', 'Augusto', 'Aurelio', 'Baltazar', 'Bartolome', 'Belisario', 'Benjamin', 'Benedicto', 'Bernarndo', 'Boris', 'Braulio', 'Brian', 'Bruno', 'Cain', 'Camilo', 'Carlos', 'Casimiro', 'Cesar', 'Christian', 'Christopher', 'Cristobal', 'Claudio', 'Clemente', 'Constancio', 'Constantino', 'Cristian', 'Cristobal', 'Daniel', 'Dario', 'David', 'Diego', 'Domingo', 'Edgar', 'Eduardo', 'Elias', 'Emilio', 'Enrique', 'Ernesto', 'Esteban', 'Eugenio', 'Ezequiel', 'Fabian', 'Federico', 'Felipe', 'Felix', 'Fermin', 'Fernando', 'Fidel', 'Francisco', 'Gabriel', 'Gerardo', 'German', 'Gilberto', 'Giovanni', 'Gonzalo', 'Gregorio', 'Guillermo', 'Gustavo', 'Hector', 'Heriberto', 'Hugo', 'Hilario', 'Humberto', 'Hilario', 'Ignacio', 'Isaac', 'Ismael', 'Ivan', 'Jacobo', 'Jaime', 'Jairo', 'Javier', 'Jesus', 'Joaquin', 'Jorge', 'Jose', 'Juan', 'Julian', 'Kevin', 'Leandro', 'Leonardo', 'Leopoldo', 'Lucas', 'Luis', 'Manuel', 'Marcos', 'Mario', 'Martin', 'Mateo', 'Matias', 'Maximiliano', 'Maximo', 'Miguel', 'Nelson', 'Nestor', 'Nicolas', 'Octavio', 'Omar', 'Oscar', 'Orlando', 'Ovidio', 'Pablo', 'Paulo', 'Patricio', 'Pedro', 'Rafael', 'Ramiro', 'Ramon', 'Raul', 'Ricardo', 'Roberto', 'Ruben', 'Salvador', 'Samuel', 'Santiago', 'Sergio', 'Simon', 'Teodoro', 'Tito', 'Tobias', 'Tomas', 'Ulises', 'Valentin', 'Vicente', 'Victor', 'Wilfredo', 'William', 'Zacarias', 'Sofia', 'Camila', 'Valentina', 'Isabella', 'Valeria', 'Daniela', 'Mariana', 'Sara', 'Victoria', 'Gabriela', 'Ximena', 'Andrea', 'Natalia', 'Mia', 'Martina', 'Lucia', 'Samantha', 'Maria', 'Maria Fernanda', 'Nicole', 'Alejandra', 'Paula', 'Emily', 'Maria Jose', 'Fernanda', 'Luciana', 'Ana Sofia', 'Melanie', 'Regina', 'Catalina', 'Ashley', 'Renata', 'Agustina', 'Abril', 'Emma', 'Emilia', 'Jazmin', 'Juanita', 'Briana', 'Vanessa', 'Antonia', 'Laura', 'Antonella', 'Luna', 'Carla', 'Allison', 'Monserrat', 'Paulin', 'Isabel', 'Juliana', 'Valerie', 'Florencia', 'Adriana', 'Naomi', 'Amanda', 'Ariana', 'Morena', 'Natalie', 'Constanza', 'Lola', 'Zoe', 'Carolina', 'Micaela', 'Julia', 'Claudia', 'Paola', 'Alexa', 'Elena', 'Isidora', 'Rebeca', 'Josefina', 'Abigail', 'Julieta', 'Melissa', 'Michelle', 'Alba', 'Maria Camila', 'Angela', 'Delfina', 'Aitana', 'Stephanie', 'Fatima', 'Manuela', 'Alexandra', 'Paloma', 'Candela', 'Clara', 'Laura Sofia', 'Diana', 'Ana Maria', 'Guadalupe', 'Barbara', 'Bianca', 'Miranda', 'Sabrina', 'Pilar', 'Ana Maria', 'Marta', 'Ana', 'Genesis'];

const apellidos = ['Abdo', 'Abreu', 'Acosta', 'Aguayo', 'Aguilar', 'Aguilar', 'Aguilar', 'Aguirre', 'Aguirre', 'Alberu', 'Alcantar', 'Alcaraz', 'Alcocer', 'Alexanderson', 'Almeda', 'Alonso', 'Alonso', 'Alpuche', 'Alva', 'Alvarado', 'alvarez', 'alvarez', 'alvarez', 'alvarez', 'alvarez', 'Amato', 'Amigo', 'angeles', 'angeles', 'Apiquian', 'Araico', 'Arauz', 'Arcila', 'Arellanes', 'Arenas', 'Argüero', 'Arias', 'Ariza', 'Armendariz', 'Arredondo', 'Arriaga', 'Arriaga', 'Arrieta', 'Arroyo', 'Arteaga', 'Arzate', 'Astiazaran', 'avalos', 'avila', 'avila', 'avila', 'Aviña', 'Ayala', 'Baez', 'Baeza', 'Baeza', 'Baptista', 'Barinagarrementeria', 'Barquera', 'Barragan', 'Barrera', 'Barrera', 'Barrientos', 'Barriguete', 'Barroso', 'Basurto', 'Becker', 'Bedolla', 'Berlanga', 'Bermudez Gomez', 'Berruecos', 'Berumen', 'Biagi', 'Blanco', 'Bobadilla', 'Bojalil', 'Bolio', 'Bonvecchio', 'Borja', 'Borrayo', 'Bosques', 'Bourges', 'Bracho', 'Briones', 'Buendia', 'Burgos', 'Cabral', 'Calderon', 'Calderon', 'Calleja', 'Calva', 'Calva', 'Camacho', 'Camacho', 'Campillo', 'Campos', 'Campuzano', 'Cano', 'Canto', 'Cantu', 'Cantu', 'Carabez', 'Cardiel', 'Cardona', 'Careaga', 'Carnevale', 'Carranza', 'Carrillo', 'Carrillo', 'Castaño', 'Castañon', 'Castellanos', 'Castillo', 'Cebrian', 'Celis', 'Cereijido', 'Cetina', 'Chan', 'Chapela', 'Chavez', 'Chavez', 'Chico', 'Clark', 'Contreras', 'Cordera', 'Cordova', 'Corona', 'Correa', 'Cossio', 'Cravioto', 'Criales', 'Cruz', 'Cuevas', 'De La Fuente', 'De La Fuente', 'De La Garza', 'De La Llata', 'De La Peña', 'De La Rosa', 'De La Torre', 'Decanini', 'Dehesa', 'Del Rio', 'Diaz', 'Diaz', 'Diaz', 'Diaz', 'Diaz', 'Diaz', 'Diaz De Leon', 'Dominguez', 'Dominguez', 'Dominguez', 'Dominguez', 'Dominguez', 'Dreyfus', 'Dueñas', 'Dufoo', 'Duran', 'Duran', 'Eguibar', 'Eid', 'Elizondo', 'Escalante', 'Escobar', 'Escobar', 'Escobedo', 'Eslava', 'Espinola', 'Espinosa', 'Estañol', 'Estrada', 'Estrada', 'Estrada', 'Estrada', 'Exaire', 'Fajardo', 'Fajardo', 'Ferat', 'Ferez', 'Feria', 'Fernandez', 'Fernandez De Castro', 'Field', 'Flisser', 'Flores', 'Flores', 'Fraga', 'Franco', 'Frati', 'Frenk', 'Fuente', 'Furuya', 'Gabilondo', 'Gabriel', 'Galindo', 'Gallegos', 'Gallegos', 'Gamba', 'Garcia', 'Garcia', 'Garcia', 'Garcia', 'Garcia', 'Garcia', 'Garcia', 'Garcia', 'Garcia', 'Garcia', 'Garcia', 'Garza', 'Garza', 'Gaspar', 'Gerson', 'Giono', 'Giron', 'Gomez', 'Gomez', 'Gomez', 'Gomez', 'Gomez', 'Gomez', 'Gomez', 'Gongora', 'Gonzalez', 'Gonzalez', 'Gonzalez', 'Gonzalez', 'Gonzalez', 'Gonzalez', 'Gonzalez', 'Gonzalez', 'Gonzalez', 'Gonzalez', 'Gonzalez', 'Gonzalez De Cosio', 'Gonzalez Duarte', 'Gonzalez-Mariscal', 'Gonzalez-Mariscal', 'Gordon', 'Gorodezky', 'Graef', 'Granados', 'Graue', 'Graue', 'Guadalajara', 'Gual', 'Guardiola', 'Guerrero', 'Guevara', 'Guevara', 'Guevara', 'Guinto', 'Guiscafre', 'Guitierrez', 'Gulias', 'Gutierrez', 'Gutierrez', 'Gutierrez', 'Gutierrez', 'Halabe', 'Hamui', 'Heinze', 'Hernandez', 'Hernandez', 'Hernandez', 'Hernandez', 'Hernandez', 'Hernandez', 'Hernandez', 'Hernandez', 'Hernandez', 'Herrera', 'Herrera', 'Herrera', 'Herrera', 'Herrera', 'Hicks', 'Hijar', 'Hinojosa', 'Hiriart', 'Hojyo', 'Hong', 'Huerta', 'Hurtado', 'Ibarra', 'Ibarra', 'Iglesias', 'Ilarraza', 'Infante', 'Irigoyen', 'Isibasi', 'Isordia', 'Iturralde', 'Jakez', 'Jauregui', 'Jerjes-Sanchez', 'Jimenez', 'Jimenez', 'Jung', 'Karchmer', 'Katz', 'Kaufer', 'Kershenobich', 'Kimura', 'Kimura', 'Knaul', 'Kuri', 'Kuri', 'Laclette', 'Lacy', 'Lara', 'Larrea', 'Lazcano', 'Legaspi', 'Lemus', 'Leon', 'Lifshitz', 'Lima', 'Llamas', 'Llorente', 'Lopez', 'Lopez', 'Lopez', 'Lopez', 'Lopez', 'Lopez', 'Lopez', 'Lopez', 'Lopez', 'Lopez', 'Loredo', 'Lozano', 'Luna', 'Lupi', 'Macias', 'Macias', 'Macias', 'Madero', 'Madrazo', 'Majluf', 'Malacara', 'Mancilla', 'Mandujano', 'Manjarrez', 'Mansilla', 'Marin', 'Marin', 'Marquez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez', 'Martinez-Reding', 'Mas', 'Maulen', 'Meaney', 'Medina', 'Medina', 'Medina', 'Medina-Mora', 'Mejia', 'Melendez', 'Melman', 'Mendez', 'Mendoza', 'Mendoza', 'Mendoza', 'Meneses', 'Meneses', 'Mercado', 'Mercado', 'Millan', 'Mimenza', 'Mohar', 'Molina', 'Molina', 'Montalvo', 'Morales', 'Morales', 'Morales', 'Morales', 'Moreno', 'Moreno', 'Moreno', 'Moreno', 'Moreno', 'Mosqueda', 'Muñoz', 'Muñoz', 'Muñoz', 'Muñoz', 'Muñoz', 'Murguia', 'Mutchinick', 'Narro', 'Nathal', 'Nava', 'Navarro', 'Navarro', 'Neri', 'Nesbitt', 'Nicolini', 'Nieto', 'Ocampo', 'Ochoa', 'Ochoa', 'Ondarza', 'Ontiveros', 'Orea', 'Orozco', 'Orozco', 'Ortega', 'Ortega', 'Ortiz', 'Ostrosky', 'Palacios', 'Parra', 'Pascual', 'Pastelin', 'Pedron', 'Peña', 'Peña', 'Peñaloza', 'Perez', 'Perez', 'Perez', 'Perez', 'Perez', 'Perez Rincon', 'Perichart', 'Pineda', 'Piña', 'Plancarte', 'Poitevin', 'Poletti', 'Ponce', 'Ponce De Leon', 'Ponce De Leon', 'Ponce De Leon', 'Posadas', 'Prado', 'Pravin', 'Pulido', 'Quiroz', 'Ramirez', 'Ramirez', 'Ramirez', 'Ramirez', 'Ramon', 'Ramos', 'Rangel', 'Rendon', 'Revuelta', 'Reyes', 'Reyes', 'Reyes', 'Reyes', 'Reyes', 'Richardson', 'Ridaura', 'Rios', 'Rivas', 'Rivera', 'Rivera', 'Rivera', 'Rivero', 'Robles', 'Rocha', 'Rodriguez', 'Rodriguez', 'Rodriguez', 'Rodriguez', 'Rodriguez', 'Rodriguez', 'Rodriguez', 'Rodriguez', 'Rodriguez', 'Rodriguez', 'Rojas', 'Rojo', 'Roldan', 'Roldan', 'Roldan', 'Romero', 'Romieu', 'Rosales', 'Rosas', 'Ruano', 'Rubio', 'Rubio', 'Rudomin', 'Rueda', 'Ruelas', 'Ruiz', 'Ruiz', 'Ruiz', 'Ruiz', 'Ruiz De Chavez', 'Ruiz Palacios', 'Saez De Ocariz', 'Said', 'Salamanca', 'Salas', 'Salazar', 'Salazar', 'Salcedo', 'Salin', 'Salinas', 'San Juan', 'Sanchez', 'Sanchez', 'Sanchez', 'Sanchez', 'Sanchez', 'Sandoval', 'Santamaria', 'Santillan', 'Santos', 'Santos', 'Santos', 'Santos-Burgoa', 'Sarti', 'Saturno', 'Sauceda', 'Schmulson', 'Schunemann', 'Sepulveda', 'Sepulveda', 'Sereno', 'Shor', 'Sienra', 'Sierra', 'Sifuentes', 'Soberon', 'Soberon', 'Soda', 'Solorzano', 'Sosa', 'Sotelo', 'Soto', 'Soto', 'Soto', 'Suzan', 'Takahashi', 'Tamayo', 'Tapia', 'Teran', 'Torre', 'Torre', 'Torre', 'Torres', 'Torres', 'Torres', 'Torres', 'Torres', 'Toussaint', 'Tovar', 'Treviño', 'Treviño', 'Tsutsumi', 'Tusie', 'Ulloa', 'Urbina', 'Uribe', 'Urrutia', 'Uscanga', 'Vadillo', 'Valdes', 'Valdovinos', 'Valencia', 'Valenzuela', 'Vallejo', 'Varela', 'Vargas', 'Vargas', 'Vargas', 'Vargas', 'Vargas', 'Vargas', 'Vasquez', 'Vazquez', 'Vazquez', 'Vazquez', 'Vazquez Del Mercado', 'Vazquez-Vela', 'Vega', 'Vega', 'Velasco', 'Velasco', 'Velasco', 'Velasquez', 'Velasquez', 'Vera', 'Verastegui', 'Verdejo', 'Vidrio', 'Viesca', 'Vilar', 'Vilar', 'Vilatoba', 'Villalpando', 'Villalpando', 'Villarreal', 'Vital', 'Volkow', 'Wacher', 'Wolpert', 'Yamamoto', 'Yankelevich', 'Zabal', 'Zarain', 'Zazueta', 'Zentella', 'Zenteno', 'Zonana', 'Francis', 'Hernandez', 'Torres', 'Gonzalez', 'Navarro', 'Salinas', 'Setien', 'Cruz', 'Garcia', 'Gomez', 'Curiel', 'Verduzco', 'Varela', 'Rosas', 'Valdes', 'Vanegas', 'Viveros', 'Aranda', 'Espinosa', 'Cabrero', 'Cordero', 'Del Rio', 'Leffmans', 'Maldonado', 'Nemegyei', 'Martinez', 'Castañeda', 'angeles', 'Castellanos', 'Guitart', 'Laguillo', 'Gongora', 'Herrera', 'Garcia', 'Guzman', 'Sanchez', 'Montaño', 'Andraca', 'Borunda', 'Galan', 'Gracia', 'Pizano', 'Rodriguez', 'Acevedo', 'Gomez', 'Garcia', 'Diaz', 'Casado', 'Funes', 'Rodriguez', 'Valencia', 'Ruiz', 'Saldaña', 'Bacab', 'Herrera', 'Gonzalez', 'Aldatz', 'Cervera', 'Garcia', 'Franco', 'Saldaña', 'Gutierrez', 'Melendez', 'Villa', 'Acevedo', 'Fauser', 'Barajas', 'Cisneros', 'Llanos', 'Villalobos', 'Campos', 'Filizola', 'Favela', 'Sandoval', 'Parra', 'Cicero', 'Arenas', 'Aburto', 'Sanchez', 'Padilla', 'Rodriguez', 'Blanchet', 'Garduño', 'Hernandez', 'Vargas', 'Castañeda', 'Colmenero', 'Garcidueñas', 'Castillo', 'Mercado', 'Y Rodriguez', 'Arroyo', 'Ortiz', 'Serrano', 'Navarro', 'Fernandez', 'Valle', 'De Cetina', 'Brito', 'De Leon', 'Trejo', 'Rios', 'Perez', 'Reyna', 'Cantoni', 'Lira', 'Esper', 'Ruiz', 'Meneses', 'Gonzalez', 'Villegas', 'Martinez', 'Garcia', 'Lopez', 'Mattioli', 'Manzanilla', 'Nuñez', 'Mendoza', 'Negrete', 'Lopez', 'Ponce De Leon', 'Peralta', 'Ruiz', 'Pastor', 'Villalobos', 'Vazquez', 'Rotter', 'Diaz', 'Quintana', 'Cortes', 'Lopez', 'Ramos', 'Ramirez', 'Sandoval', 'Salazar', 'Romero', 'Diaz', 'Laris', 'Bravo', 'Teran', 'Violante', 'Navarro', 'Jouanen', 'Martinez', 'Martinez', 'Quiñonez', 'Rodriguez', 'Olavarrieta', 'Ponce', 'Carrillo', 'Cherit', 'Cherit', 'Malagon', 'Rosado', 'Cortes', 'Gonzalez', 'Olvera', 'Arenas', 'Mckinster', 'Cuenca', 'Lidt', 'Riojas', 'Acosta', 'Briones', 'Gutierrez', 'De La Peña', 'Campos', 'Zavaleta', 'Lopez', 'Vidal', 'Castañon', 'Gutierrez', 'Parra', 'Garcia', 'Murad', 'Dolci', 'Ortiz', 'Osorio', 'Santander', 'Bernal', 'Carrocera', 'Peredo', 'Cortazares', 'Steinbruch', 'Rivera', 'Suarez', 'Mouret', 'Guevara', 'Munari', 'Mora', 'Del Campo', 'Meguro', 'Navarro', 'Ortiz', 'Sevilla', 'Cigarroa', 'Hernandez', 'Ayala', 'Aranda', 'De La Torre', 'Diaz', 'Garcia', 'Peña', 'Ramos', 'Rivas', 'Sainz', 'Velasco', 'Villarreal', 'Carrasco', 'Mercado', 'Ramos', 'Hernandez', 'Cwilich', 'Cerezo', 'Perez', 'Alcala', 'Almaguer', 'Barreto', 'Perez', 'Quiroz', 'Reguera', 'Diaz', 'Rivera', 'Amaro', 'Block', 'Chavez', 'Contreras', 'Cornejo', 'Hermosillo', 'Ojeda', 'Ortiz', 'Perez', 'Romero', 'Bonilla', 'Martinez', 'Briseño', 'Y Muriel', 'Y Muriel', 'Barabejzyk', 'Lauferman', 'Sanchez', 'Arriola', 'Hernandez', 'Wiechers', 'Boo', 'Castro', 'Fernandez', 'Avendaño', 'Guzman', 'Lopez', 'Cruz', 'Balanzar', 'Gallardo', 'Ruiz', 'Guerrero', 'Aguirre', 'Robledo', 'Samperio', 'Reyes', 'Cherem', 'Sutton', 'Martin', 'avila', 'Da Motta', 'Jauregui', 'Molina', 'Ortiz', 'Pando', 'Rodriguez', 'Solis', 'Valencia', 'Abarca', 'Esparza', 'Goepfert', 'Hernandez', 'Montalvo', 'Gomez', 'Medina', 'Becerril', 'Urdanivia', 'Tomoka', 'Chong', 'Yepez', 'Andrade', 'Arias', 'Ponce De Leon', 'Morales', 'Lomeli', 'Castañeda', 'Coria', 'Araujo', 'Salas', 'Torres', 'Ocampo', 'Renaud', 'Diaz', 'Ponce', 'Sanchez', 'Cook', 'Krivitzky', 'Guss', 'Horwitz', 'Stalnikowitz', 'Fujikami', 'Fujikami', 'Windish', 'Harcuch', 'Morales', 'San Roman', 'Niebla', 'Muñoz', 'Gallo', 'Ponce', 'Velasco', 'Bravo', 'Rodriguez', 'Guinzberg', 'Gomez', 'Esperon', 'Peters', 'Alarcon', 'Barcena', 'Carrillo', 'Cervantes', 'Colome', 'Karpovitch', 'Martinez', 'Muñoz', 'Vidal', 'Macias', 'Abdala', 'Ascencio', 'Ortiz', 'Herrera', 'Gutierrez', 'Hernandez', 'Parra', 'Rovalo', 'Navarro', 'Cruz', 'Hernandez', 'Ramirez', 'Valdes', 'Gutierrez', 'Olivares', 'Y Lopez', 'Y Lopez', 'Murillo', 'Abundis', 'Cortes', 'Fong', 'Gonzalez', 'Juarez', 'Lavin', 'Manautou', 'Murillo', 'Palomo', 'Ramirez', 'Rios', 'Salgado', 'Sanchez', 'Garcia', 'Oliva', 'Radovan', 'Mendiolea', 'Franco', 'Rodriguez', 'Santillan', 'Icaza', 'Arangure', 'Zajgla', 'Szteyn', 'Sanchez', 'Morfin', 'Nuñez', 'Pinto', 'Garcia', 'Gonzalez', 'Diaz', 'Atri', 'Guerrero', 'Alvarado', 'Betancourt', 'Montalva', 'Guarneros', 'Jave', 'Buenrostro', 'Espinosa', 'Polanco', 'Montor', 'Altamirano', 'Aranda', 'Jimenez', 'Portillo', 'Rodriguez', 'Taylor', 'Castellanos', 'Espinosa', 'Hernandez', 'Reyes', 'Valle', 'Peniche', 'Baringoltz', 'Robles', 'Vera', 'Gutierrez De Velasco', 'Reynoso', 'Ocaña', 'Vela', 'Falomir', 'Sanchez', 'Zermeño', 'Candiani', 'Diaz-Lopez', 'Ramirez', 'Vidaurreta', 'Sanchez De La Barquera', 'Tejeda', 'Covarrubias', 'Topete', 'Aguilar', 'Pierres', 'Hidalgo', 'Wegman', 'Saucedo', 'Covarrubias', 'Ramos', 'Hernandez', 'Nuevo', 'Duque', 'Rodriguez', 'Santillan', 'Guzman', 'Cuevas', 'Padilla', 'Peña', 'Tamayo', 'Garcia', 'Perera', 'Villaseñor', 'Garza', 'Sanchez', 'Chacon', 'Vazquez', 'Macotela', 'Castañeda', 'Rosales', 'Garduño', 'Romero', 'Calleros', 'Mehta Na', 'Zamudio', 'Mercado', 'Arias', 'Barba', 'Mata', 'Ortiz', 'Romero', 'Martinez', 'Frausto', 'Perez', 'Gutierrez', 'Cunningham', 'Fuentes', 'Lopez', 'Morales', 'Sanchez', 'Lopez Collado', 'Sanz', 'Castañeda', 'Ruiz', 'Dommarco', 'Luna', 'Reyes', 'Serrano', 'Diaz', 'Arrieta', 'Covarrubias', 'De Romo', 'Gutierrez', 'Lopez', 'Moguel', 'Noriega', 'Perez', 'Suarez', 'Violante', 'Weber', 'Dosal', 'Medina', 'Gomez', 'Marin', 'Valadez', 'Cardenas', 'Pagezy', 'Olivarez', 'Peralta', 'Aguilar', 'Donnadieu', 'Monteverde', 'Zevnovaty', 'Franco', 'Barajas', 'Argüelles', 'Garcia', 'Reyes', 'Delgado', 'Guerrero', 'Y Santos', 'Gutierrez', 'Y Fernandez', 'Gomez', 'Alanis', 'Schettino', 'Vazquez', 'Vargas', 'Pascual', 'Carmona', 'Orta', 'Chapula', 'Hernandez', 'Marle', 'Mendiola', 'Garcia', 'Zarate', 'Linares', 'Doherty', 'Argumedo', 'Garcia', 'Preciado', 'Zarnecki', 'Gutierrez', 'Hernandez', 'Garcia', 'Wasserman', 'De Aluja', 'Amor', 'Vildosola', 'Colo', 'Pinsker', 'Monge', 'Madero', 'Osornio', 'Chavez', 'Mainero', 'Merhy', 'Santos', 'Ortiz', 'Morales', 'Eguibar', 'Hernandez', 'Lopez', 'Azpiri', 'Monroy', 'Y Orozco', 'Conyer', 'Juarez', 'Delgadillo', 'Amione', 'Bouscoulet', 'Corzo', 'Lopez', 'Villalobos', 'Y Torres', 'Zamora', 'Caire', 'Palacio', 'Becerra', 'Garcia-Manzo', 'Fujiyoshi', 'Luna', 'Aguirre', 'Fuentes', 'Esquivel', 'Aguilar', 'Dominguez', 'Ortega', 'Flores', 'Diaz', 'Mayoral', 'Gomez-Gallardo', 'Venegas', 'Rueda', 'Alarcon', 'Barron', 'Basterra', 'Guadarrama', 'Hernandez', 'Origel', 'Garibay', 'Antona', 'Chavez', 'De Anda', 'Espinosa', 'Sanchez', 'Franco', 'Memije', 'Campos', 'Monroy', 'Velazquez', 'Arellano', 'Jones', 'Lastra', 'Aviles', 'Paris', 'Lopez', 'Treviño', 'Compte', 'Puig', 'Chapa', 'Casas', 'Hernandez', 'Garza', 'Reyes', 'Fernandez', 'Rodarte', 'Barraza', 'Furusho', 'Nedvenovich', 'Cerdeira', 'Herzberg', 'Mendizabal', 'Dehesa', 'Castellanos', 'Farca'];

const municipios = ['Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula', 'Escuintla', 'Guatemala', 'Huehuetenango', 'Izabal', 'Jalapa', 'Jutiapa', 'Petén', 'El Progreso', 'Quetzaltenango', 'Quiché', 'Retalhuleu', 'Sacatepéquez', 'San Marcos', 'Santa Rosa', 'Sololá', 'Suchitepéquez', 'Totonicapán', 'Zacapa'];

const vaccines = ['Pfizer', 'Moderna', 'Sputnik-V', 'Jhonson', 'Astrazeneca'];

//Lógica
let salida = '[\n';
for (let i = 0; i<registros; i++) {
    salida += '\t{\n';
    salida += '\t\t"name": "' + nombres[Math.floor(Math.random() * nombres.length)] + ' ' + apellidos[Math.floor(Math.random() * apellidos.length)] + '",\n';
    salida += '\t\t"location": "' + municipios[Math.floor(Math.random() * municipios.length)] + '",\n';
    salida += '\t\t"age": ' + (Math.floor(Math.random() * (edadMaxima - edadMinima)) + edadMinima).toString() + ',\n';
    salida += '\t\t"vaccine_type": "' + vaccines[Math.floor(Math.random() * vaccines.length)] + '",\n';
    salida += '\t\t"n_dose": ' + (Math.random()>0.5 ? '1' : '2') + '\n';
    salida += '\t}' + (i<registros-1 ? ',' : '') + '\n';
}
salida += ']\n';

const fs = require('fs');
fs.writeFileSync('traffic.json', salida);
console.log('Archivo generado');
