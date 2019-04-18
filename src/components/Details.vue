<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Details</h3>
            </div>
            <div class="card-body">
                    <div class="form-group">
                        <label>Item Name:</label>
                         <td>{{ item.name }}</td>
                    </div>
                    <div class="form-group">
                        <label>Item Price:</label>
                        <td>{{ item.price }}</td>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
        data(){
            return{
                item:{}
            }
        },
        created: function(){
            this.getItem();
        },
        methods: {
            getItem()
            {
              let uri = 'http://localhost:4000/items/details/' + this.$route.params.id;
                this.axios.get(uri).then((response) => {
                    this.item = response.data;
                });
            }
        }
    }
</script>
