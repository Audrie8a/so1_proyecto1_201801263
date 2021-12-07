//Header para los macros module_init y module_exit
#include <linux/init.h>
//Header obligatorio de todos los modulos
#include <linux/module.h>
//Header para usar KERN_INFO
#include <linux/kernel.h>

//Header necesario porque se usara proc_fs
#include <linux/proc_fs.h>
/* for copy_from_user */
#include <asm/uaccess.h>	
/* Header para usar la lib seq_file y manejar el archivo en /proc*/
#include <linux/seq_file.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Ejemplo creacion de modulo en Linux, Laboratorio Sistemas Operativos 1");
MODULE_AUTHOR("Bernald Renato Paxtor Peren");

//Función para escribir un archivo en el Proc
static int write_file(struct seq_file *archivo, void *v){
    seq_printf("201801263");
    return 0;
}

//Función para leer archivo con CAT
static init open_file(struct inode *inode, struct file *file)
{
    return single_open(file, write_file, NULL);
}

static struct file_operations operaciones = {
    .open = open_file,
    .read = seq_read
};


/*static struct proc_ops operaciones =
{
    .proc_open = open_file,
    .proc_read = seq_read
};
*/


//Función que se ejecuta al iniciar el módulo en el kernel (insmod)
static init _insert(void)
{
    proc_create("201801263", 0,NULL,&operaciones);
    printk(KERN_INFO "Se insertó módulo! \n");
    return 0;
}

//Función que se ejecutal al remover módulo (rmod)
static void _remove(void)
{
    //remove_proc_entry("Sistemas Operativos 1",NULL);
    remove_proc_entry("201801263",NULL);
    printk(KERN_INFO "Se descargó módulo! \n");
}

module_init(_insert);
module_exit(_remove);