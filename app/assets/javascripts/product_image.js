// // product.newのtext_fileのjs
// $(document).on('turbolinks:load', ()=> {
//   // 画像用のinputを生成する関数
//   const buildFileField = (index)=> {
//     const html = `<div data-index="${index}" class="js-file_group">
//                     <input class="js-file" type="file"
//                     name="product[product_images_attributes][${index}][image]"
//                     id="product_product_images_attributes_${index}_image"><br>
//                     <div class="js-remove">削除</div>
//                   </div>`;
//     return html;
//   }

//   // file_fieldのnameに動的なindexをつける為の配列
//   let fileIndex = [1,2,3,4,5,6,7,8,9,10];

//   $('#image-box').on('change', '.js-file', function(e) {
//     // fileIndexの先頭の数字を使ってinputを作る
//     $('#image-box').append(buildFileField(fileIndex[0]));
//     fileIndex.shift();
//     // 末尾の数に1足した数を追加する
//     fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
//   });

//   $('#image-box').on('click', '.js-remove', function() {
//     $(this).parent().remove();
//     // 画像入力欄が0個にならないようにしておく
//     if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
//   });
// });

$(function(){
  //DataTransferオブジェクトで、データを格納する箱を作る
  var dataBox = new DataTransfer();
  //querySelectorでfile_fieldを取得
  var file_field = document.querySelector('input[type=file]')
  //fileが選択された時に発火するイベント
  $('#img-file').change(function(){
    //選択したfileのオブジェクトをpropで取得
    var files = $('input[type="file"]').prop('files')[0];
    $.each(this.files, function(i, file){
      //FileReaderのreadAsDataURLで指定したFileオブジェクトを読み込む
      var fileReader = new FileReader();

      //DataTransferオブジェクトに対して、fileを追加
      dataBox.items.add(file)
      //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に代入
      file_field.files = dataBox.files

      var num = $('.item-image').length + 1 + i
      fileReader.readAsDataURL(file);
　　　 //画像が10枚になったら超えたらドロップボックスを削除する
      if (num == 10){
        $('#image-box__container').css('display', 'none')   
      }
      //読み込みが完了すると、srcにfileのURLを格納
      fileReader.onloadend = function() {
        var src = fileReader.result
        var html= `<div class='item-image' data-image="${file.name}">
                    <div class=' item-image__content'>
                      <div class='item-image__content--icon'>
                        <input type="file" name="product[product_images_attributes][][image]" value="" style="display:none"></input>
                        <img src=${src} width="100" height="80" >
                      </div>
                    </div>
                    <div class='item-image__operetion'>
                      <div class='item-image__operetion--edit'>編集</div>
                      <div class='item-image__operetion--delete'>削除</div>
                    </div>
                  </div>`
        //image_box__container要素の前にhtmlを差し込む
        $('#image-box__container').before(html);
      };
      //image-box__containerのクラスを変更し、CSSでドロップボックスの大きさを変えてやる。
      $('#image-box__container').attr('class', `item-num-${num}`)
    });
  });
//削除ボタンをクリックすると発火するイベント
  $(document).on("click", '.item-image__operetion--delete', function(){
    //削除を押されたプレビュー要素を取得
    var target_image = $(this).parent().parent()
    //削除を押されたプレビューimageのfile名を取得
    var target_name = $(target_image).data('image')
    //プレビューがひとつだけの場合、file_fieldをクリア
    if(file_field.files.length==1){
      //inputタグに入ったファイルを削除
      $('input[type=file]').val(null)
      dataBox.clearData();
      console.log(dataBox)
    }else{
      //プレビューが複数の場合
      $.each(file_field.files, function(i,input){
        //削除を押された要素と一致した時、index番号に基づいてdataBoxに格納された要素を削除する
        if(input.name==target_name){
          dataBox.items.remove(i) 
        }
      })
      //DataTransferオブジェクトに入ったfile一覧をfile_fieldの中に再度代入
      file_field.files = dataBox.files
    }
    //プレビューを削除
    target_image.remove()
    //image-box__containerクラスをもつdivタグのクラスを削除のたびに変更
    var num = $('.item-image').length
    $('#image-box__container').show()
    $('#image-box__container').attr('class', `item-num-${num}`)
  })
});