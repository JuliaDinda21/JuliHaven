document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Apples Cider', img: 'apple-bottle.jpg', price: 20000 },
      { id: 2, name: 'Mango Juice', img: 'manggo-bottle.jpg', price: 15000 },
      { id: 3, name: 'Pineapple Juice', img: 'pineapple-bottle.jpg', price: 15000 },
      { id: 4, name: 'Watermelon Juice', img: 'watermelon-bottle.jpg', price: 15000 },
      { id: 5, name: 'Freeze Dried Blubberries', img: 'bluberry-dry.jpg', price: 28000 },
      { id: 6, name: 'Freeze Dried Bananas', img: 'pisang-dry.jpg', price: 25000 },
      { id: 7, name: 'Freeze Dried Apples', img: 'apple-dry.jpg', price: 25000 },
      { id: 8, name: 'Freeze Dried Strawberries', img: 'strawberry-dry.jpg', price: 28000 },
      { id: 9, name: 'Freeze Dried Mango', img: 'manggo-dry.jpg', price: 25000 },
      { id: 10, name: 'Freeze Dried Raspberries', img: 'rasberry-dry.jpg', price: 28000 },
      { id: 11, name: 'Freeze Dried Mix Berries', img: 'mix-berry.jpg', price: 45000 },
      { id: 12, name: 'Freeze Dried Mix Fruits', img: 'mix-dry.jpg', price: 40000 },
    ],

  }));


  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //apakah ada barang yang sama di cart nya
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika belum ada / masih kosong cartnya
      if(!cartItem) {
        this.items.push({...newItem, quantity: 1, total: newItem.price});
        this.quantity++;
        this.total += newItem.price;
      } else {
        //cek itemnya sama atau berbeda
        this.items = this.items.map((item) => {
          //berbeda
          if(item.id !== newItem.id) {
            return item;
          } else {
            //sudah ada
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      //item yg mau di remove
      const cartItem = this.items.find((item) => item.id === id);

      //lebih dari satu item
      if(cartItem.quantity > 1) {
      } else if (cartItem.quantity === 1) {
        //jika sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
        this.items = this.items.map((item) => {
            //jika bukan barang yang diklik
            if(item.id !== id) {
              return item;
            } else {
              item.quantity--;
              item.total = item.price * item.quantity;
              this.quantity--;
              this.total -= item.price;
              return item;
            }
        });
      },
    });
  });
//konversi rupiah
const rupiah = (number) => {
return new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
}).format(number);
};


