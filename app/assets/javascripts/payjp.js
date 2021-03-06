

$(window).on("turbolinks:load", function(){
  var submit = document.getElementById("token_submit");
  if (submit != null){
  submit.addEventListener('click', function(e){  // 追加するボタンが押されたらイベント発火
    e.preventDefault();  // ボタンを無効化する
    var card = {  
      number: document.getElementById("card_number").value, // ビューのidによって指定されたcard_numberの数字を持ってきている
      exp_month: document.getElementById("exp_month").value,
      exp_year: document.getElementById("exp_year").value,
      cvc: document.getElementById("cvc").value
    };
    if (card.number == "", card.exp_month == "01", card.exp_year == "20", card.cvc == "") {
      alert("カード情報が入力されていません。"); // 送られた値がデフォルト値だった場合
    } else { // 値が送られてきた場合
      Payjp.createToken(card, function(status, response) {  // トークンを生成
        if (status === 200) { //status === 200は正常に処理されたということを意味する
          $("#card_number").removeAttr("name");
          $("#exp_month").removeAttr("name");
          $("#exp_year").removeAttr("name"); 
          $("#cvc").removeAttr("name");
          $("#card_token").append(
            $('<input type="hidden" name="payjp-token">').val(response.id)
          ); 
            // 生成したトークンを送信する準備を整える
          $("#charge-form")[0].submit();
          alert("登録が完了しました");
        } else {
          alert("正しいカード情報を入力してください。");
          }
        });
      }
      false
    });
  }
});
