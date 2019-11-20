function Conjuncion(a,b) {
    if (a == '1' && b == '1') {
      return '1';
    } 
    return '0';
  }
  function Disyuncion(a,b) {
    if (a == '0' && b == '0') {
      return '0';
    } 
    return '1';
  }
  function Condicional(a,b) {
    if (a == '1' && b == '0') {
      return '0';
    } 
    return '1';
  }
  function Bicondicional(a,b) {
    if ((a == 1 && b == 1) || (a == 0 && b == 0)) {
      return '1';
    } 
    return '0';
  }
  function Negacion(a) {
    if (a == '1') {
      return '0';
    } 
    return '1';
  }

function basicExp(cadena)  {
    if (cadena.length > 5 || cadena.length <= 0) {
      return -1;
    }
    if (cadena.length == 1) {
      if (cadena == 0 || cadena == 1) {
        return cadena;
      }
      return -1;
    }
    if (cadena.length == 2) {
      if(cadena[0] != '~') {
         return -1;
      }
      return Negacion(cadena[1]);
    }
    if (cadena.length == 3) {
      if (cadena[1] != '^' && cadena[1] != 'v' && cadena[1] != '→' && cadena[1] != '↔') {
        return -1;
      }
      if ((cadena[0] != '1' && cadena[0] != '0') || (cadena[2] != '1' && cadena[2] != '0')) {
        return -1;
      }
      switch(cadena[1]) {
        case '^': return Conjuncion(cadena[0],cadena[2]);
        case 'v': return Disyuncion(cadena[0],cadena[2]);
        case '→': return Condicional(cadena[0],cadena[2]);
        case '↔': return Bicondicional(cadena[0],cadena[2]);
      }
    }
    if (cadena.length == 4) {
      if (cadena[0] == '~') {
          if (cadena[2] != '^' && cadena[2] != 'v' && cadena[2] != '→' && cadena[2] != '↔') {
          return -1;
        }
        if ((cadena[1] != '1' && cadena[1] != '0') || (cadena[3] != '1' && cadena[3] != '0')) {
          return -1;
        }
        switch(cadena[2]) {
          case '^': return Conjuncion(Negacion(cadena[1]),cadena[3]);
          case 'v': return Disyuncion(Negacion(cadena[1]),cadena[3]);
          case '→': return Condicional(Negacion(cadena[1]),cadena[3]);
          case '↔': return Bicondicional(Negacion(cadena[1]),cadena[3]);
        }
      } else if (cadena[0] == '0' || cadena[0] == '1') {
          if (cadena[2] != '~'){
            return -1;
          }
          if (cadena[1] != '^' && cadena[1] != 'v' && cadena[1] != '→' && cadena[1] != '↔') {
            return -1;
          }
          if (cadena[3] != '0' && cadena[3] != '1') {
            return -1;
          }
          switch(cadena[1]) {
            case '^': return Conjuncion(cadena[1],Negacion(cadena[3]));
            case 'v': return Disyuncion(cadena[1],Negacion(cadena[3]));
            case '→': return Condicional(cadena[1],Negacion(cadena[3]));
            case '↔': return Bicondicional(cadena[1],Negacion(cadena[3]));
          }
      } else {
        return -1;
      }
    }
    if(cadena.length == 5){
      if (cadena[0] != '~' || cadena[3] != '~') {
        return -1;
      }
      if (cadena[2] != '^' && cadena[2] != 'v' && cadena[2] != '→' && cadena[2] != '↔') {
        return -1;
      }
      if ((cadena[1] != '1' && cadena[1] != '0') || (cadena[4] != '1' && cadena[4] != '0')) {
        return -1;
      }
      switch(cadena[2]) {
        case '^': return Conjuncion(Negacion(cadena[1]),Negacion(cadena[4]));
        case 'v': return Disyuncion(Negacion(cadena[1]),Negacion(cadena[4]));
        case '→': return Condicional(Negacion(cadena[1]),Negacion(cadena[4]));
        case '↔': return Bicondicional(Negacion(cadena[1]),Negacion(cadena[4]));
      }
    }
  }
  export default basicExp;