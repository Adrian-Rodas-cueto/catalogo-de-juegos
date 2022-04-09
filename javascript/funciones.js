// Base de datos donde buscar 
let bd = [
    {
        titulo : "starcraftII",
        cover : "juego1.jpg"
    },
    {
        titulo : "dota",
        cover : "juego2.jpg"
    },
    {
        titulo : "lol",
        cover : "juego3.jpg"
    },
    {
        titulo : "freefire",
        cover : "juego4.gif"
    }
]
bd = MergeSort(bd);
// tomar las variables necesarias
let boton = document.getElementById("buscar");
let search = document.getElementById("search");
let cuadro = document.getElementById("cuadro");
let x = document.getElementById("x");
let sugerencias = document.getElementById("sugerencia");
let juego = document.getElementById("juego")
let si = false;
// funciones

// llenar el cuadro de sugerencias y poner las fotos
function llenar_sugerencias () {
    bd.forEach(juegos => {
        let li = document.createElement("li");
        let link = document.createElement("a");
        link.textContent = juegos.titulo;
        link.href = "#";
        link.addEventListener("click" , ()=> completar(link.textContent))
        li.appendChild(link);
        sugerencias.appendChild(li);
    });
}

function llenar_fotos () {
    bd.forEach(juegos => {
        let li = document.createElement("li");
        let link = document.createElement("a");
        let img = document.createElement("img");
        img.src = "imagenes/juegos/"+juegos.cover;
        link.href = "#";
        li.id = juegos.titulo
        link.appendChild(img)
        li.appendChild(link);
        juego.appendChild(li);
    });
}

// mostrar y ocultar cuadro de busqueda
function mostrar (){
    boton.style.marginLeft = "0"
    cuadro.style.display = "inline-block";
    cuadro.focus();
    x.style.display = "inline-block";
    cont = false;
    x.style.color = "white";
    x.style.cursor = "pointer";
}

function ocultar () {
    x.style.display = "none";
    cuadro.style.display = "none";
    cuadro.value = "";
    sugerencias.style.display = "none";
    visible();
}

function visible () {
    for (let index = 0; index < juego.getElementsByTagName("li").length; index++) {
        juego.getElementsByTagName("li")[index].style.display = "";
        
    }
}

// metodo de busqueda

function buscar (bd,d,h,x) {
    let m = (h-d)/2+d;
    //caso base 
    if(d==h && bd.getElementsByTagName("li")[d].getAttribute("id")==x){
        return d;
    }
    if(bd.getElementsByTagName("li")[m].getAttribute("id")==x){
        return m;
    }
    if (comparar(bd.getElementsByTagName("li").getAttribute("id"),x,0)) {
        return buscar(bd,m+1,h,x);
    }else{
        return buscar(bd,d,m-1,x);
    }
    
}

function comparar (m, x, i) {
    let cursor =i;
    let a = asignar_numero(x,cursor),b = asignar_numero(m,cursor);
    if (a==b) {
        cursor ++;
        comparar(m, x, cursor);
    }
    if (a>b) {
        return true;
    }else{
        return false;
    }
}

function asignar_numero (a , i) {
    let alfa = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"];
    for (let index = 0; index < alfa.length; index++) {
        if(a.charAt(i)==alfa[index]){
            return index;
        }
    }
}

//  ordenar la BD

function MergeSort(A){
    let left=[],right=[];
    // Caso base
    if(A.length==1){
        return A;
    }
    // crear y llenar los arreglos auxiliares
    else {
        let sizeLeft;
            if(A.length%2==0){
                sizeLeft= A.length/2;
            }else {
                sizeLeft= A.length/2+1;
            }
        let i;
        for(i=0; i<sizeLeft; i++){
            left[i] = A[i];
        }
        let k=0;
        for(let j=i;j<A.length;j++){
            right[k]=A[j];
            k++;
        }
    }
    // recursividad
    let O = merge(MergeSort(left), MergeSort(right));
    return O;
}

function merge(a, b){
    let O = [] ;
    let size = a.length+b.length;
    let ma=0,mb=0;
    for(let i=0; i< size;++i){
        if(comparar(a[ma].titulo,b[mb].titulo,0)){
            O[i]=a[ma];
            ++ma;
        }else{
            O[i]=b[mb];
            ++mb;
        }
        if(ma==a.length){
            ++i;
            for (let j = mb; j < b.length; j++) {
                O[i]=b[j];
                ++i;
            }
        }
        if(mb==b.length){
            ++i;
            for (let j = ma; j < a.length; j++) {
                O[i]=a[j];
                ++i;
            }
        }
    }
    return O;
}

//  funcionalidad del filtrado 
function filtrado () {
    filtrado_fotos();
    let li = sugerencias.getElementsByTagName("li");
    let text = cuadro.value.toUpperCase();

    for(i = 0 ; i < li.length ; i++){
        a = li[i].getElementsByTagName("a")[0];
        link = a.textContent || a.innerText;

        if(link.toUpperCase().indexOf(text) > -1){
            li[i].style.display = "";
            sugerencias.style.display="block"
            if(text == ""){
                sugerencias.style.display = "none"
            }
        }else {
            li[i].style.display = "none";
        }
        
    }
}

function filtrado_fotos () {
    let li = juego.getElementsByTagName("li");
    let text = cuadro.value.toUpperCase();

    for(i = 0 ; i < li.length ; i++){
        a = li[i].getAttribute("id");
        link = a;

        if(link.toUpperCase().indexOf(text) > -1){
            li[i].style.display = "";
            if(text == "" ){
                juego.style.display = ""
            }
        }else {
            li[i].style.display = "none";
        }
        
    }
}
// completar

function completar (a) {
    cuadro.value = a;
    filtrado();
}

// llamada a funciones
x.addEventListener("click", ocultar);
search.addEventListener("click", mostrar);
llenar_sugerencias();
llenar_fotos();
cuadro.addEventListener("keyup", filtrado);

