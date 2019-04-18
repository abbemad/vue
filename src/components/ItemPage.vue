<template>
  <div class="single-item">
  	<div v-if="loaded">
	   	<h3>Item details</h3>
	   	<div class="card">
	      <div class="card-header">
	        header
	      </div>
	      <div class="card-body">
	      	<p >ID: {{item._id}}</p>
	        <p >Product Name: {{item.name}}</p>
	        <p >Product Price: ${{item.price}}</p>
	        <button class="btn btn-success"> Buy Now</button>
	        <router-link :to="'/'" class="btn btn-primary"> Back </router-link>
	      </div>
		</div>
    </div>
    <div v-else> 
    	<h3>Loading...</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPage',
  data () {
    return {
        items: []
    }
  },
  beforeCreate (){
	var docRef = db.collection('items').doc(this.$route.params.id);
	docRef.get().then((doc)=> {
	    if (doc.exists) {
	        console.log("Document data:", doc.data().item_id);
	        this.itemId = doc.data().item_id
	        this.itemName = doc.data().item_name
	        this.itemPrice = doc.data().item_price
	        this.loaded = true
	    } else {

	        console.log("No such document!");
	    }
	}).catch(function(error) {
	    console.log("Error getting document:", error);
	});

  }
}
</script>

<style scoped>
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

</style>
