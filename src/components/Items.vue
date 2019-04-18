<template>
    
     <div class="container">
    <h3>Items</h3>
    <div class="card">
      <div class="card-header">
        Add a new items
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Name</label>
            <input v-model="item.name" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input v-model="item.price" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
            
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Item List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  Item ID
                </th>
                <th>
                  Item Name
                </th>
                <th>
                  Item Price
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" v-bind:key="item._id">
                <template v-if="editId == item._id">
                  <td><input v-model="editItemData.item_id" type="text"></td>
                  <td><input v-model="editItemData.item_name" type="text"></td>
                  <td><input v-model="editItemData.item_price" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(item.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{item._id}}
                  </td>
                  <td>
                    {{item.name}}
                  </td>
                  <td>
                    {{item.price}}
                  </td>
                  <td>

                    <a href="#" class="icon">
                      <i v-on:click="onDelete(item._id)" class="fa fa-trash"></i>
                    </a>
                    <a href="#" class="icon">
                      <i v-on:click="onEdit(item)" class="fa fa-pencil"></i>
                    </a>
                    <router-link 
                    :to="{
                      name:'ItemPage', 
                      params:{id: item._id}
                    }" 
                    class="icon"
                    >
                      <i class="fa fa-eye"></i>
                    </router-link>
                  </td>
                </template>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
    
</template>

<script>

    export default {
  name: 'Items',
  data () {
    return {
      items: [],
      editId: '',
      itemData: {
        
        'item._id': '',
        'item.name': '',
        'item.price': ''
      },
      editItemData: {
        
        'item.id': '',
        'item.name': '',
        'item.price': ''
      },
      items: []
    }
  },
  created() {
    this.getItems()
  },
  computed:{
    sortedItems(){
      return this.items.slice().sort((a,b)=>{
        return a.item_id - b.item_id
      })
    }
  },
  methods: {
    getItems() {
      db.collection('items').get().then(querySnapshot =>{
        const items = []

        const itemsArray = []
        let i = 0
        querySnapshot.forEach((doc)=>{
          itemsArray.push(doc.data())
          itemsArray[i].id = doc.id
          items.push(itemsArray[i])
          i++
        })
        this.items = items
      })
    },
    onSubmit(){
      db.collection('items').add(this.itemData).then(this.getItems)
      this.itemData.item._id = ''
      this.itemData.item.name = ''
      this.itemData.item.price = ''

    },
    onDelete(id){
      db.collection('items').doc(id).delete().then((data)=> {
          this.getItems()
      })
    },
    onEdit(item){
      this.editItemData.item_id = item.item._id
      this.editItemData.item_name = item.item.name
      this.editItemData.item_price = item.item.price
    },
    onCancel(){
      this.editItemData.item._id = ''
      this.editItemData.item.name = ''
      this.editItemData.item.price = ''
    },
    onEditSubmit (id){
      db.collection("items").doc(id).set(this.editItemData).then(
        this.getItems)
        this.editItemData.item._id = ''
        this.editItemData.item.name = ''
        this.editItemData.item.price = ''
    }
  }
}
</script>
